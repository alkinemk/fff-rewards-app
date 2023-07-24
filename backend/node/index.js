const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const pool = new Pool({
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  res.json("Hello");
});

app.get("/api/staking_rewards", async (req, res) => {
  console.log("/api/staking_rewards");
  try {
    const timeframe = req.query.mode;
    let my_list = req.query.walletList;

    if (typeof my_list === "string") {
      my_list = my_list.split();
    }

    const placeholders = my_list.map((_, index) => `$${index + 1}`).join(", ");

    const queryText =
      timeframe === "Weekly"
        ? `
          SELECT sum(amount) as amount
          FROM staking_transactions
          WHERE BLOCK_TIMESTAMP >= (CURRENT_DATE - interval '7 days') AND BLOCK_TIMESTAMP < CURRENT_DATE AND TX_TO IN (${placeholders})
        `
        : `
          SELECT sum(amount) as amount
          FROM staking_transactions
          WHERE TX_TO IN (${placeholders})
        `;

    const result = await pool.query(queryText, my_list);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/chest_sales", async (req, res) => {
  try {
    const timeframe = req.query.mode;
    let my_list = req.query.walletList;

    if (typeof my_list === "string") {
      my_list = my_list.split();
    }
    const placeholders = my_list.map((_, index) => `$${index + 1}`).join(", ");

    // const queryText =
    //   timeframe === "Weekly"
    //     ? `
    //     SELECT SUM(seller_amount) - SUM(buyer_amount) AS amount_difference
    //     FROM (
    //       SELECT
    //         CASE WHEN buyer IN (${placeholders}) THEN sol_amount ELSE 0 END AS buyer_amount,
    //         CASE WHEN seller IN (${placeholders}) THEN sol_amount ELSE 0 END AS seller_amount
    //       FROM chest_sales_transactions
    //       WHERE BLOCK_TIMESTAMP >= (CURRENT_DATE - interval '7 days') AND sol_amount > 0 AND BLOCK_TIMESTAMP < CURRENT_DATE AND (buyer IN (${placeholders}) OR seller IN (${placeholders}))
    //     ) as t
    //   `
    //     : `
    //     SELECT SUM(seller_amount) - SUM(buyer_amount) AS amount_difference
    //     FROM (
    //       SELECT
    //         CASE WHEN buyer IN (${placeholders}) THEN sol_amount ELSE 0 END AS buyer_amount,
    //         CASE WHEN seller IN (${placeholders}) THEN sol_amount ELSE 0 END AS seller_amount
    //       FROM chest_sales_transactions
    //       WHERE sol_amount > 0 AND buyer IN (${placeholders}) OR seller IN (${placeholders})
    //     ) as t
    //   `;

    const queryText =
      timeframe === "Weekly"
        ? `
        SELECT SUM(sol_amount) AS amount_difference FROM chest_sales_transactions WHERE seller IN (${placeholders}) AND BLOCK_TIMESTAMP >= (CURRENT_DATE - interval '7 days') AND sol_amount > 0 AND BLOCK_TIMESTAMP < CURRENT_DATE
      `
        : `
        SELECT SUM(sol_amount) AS amount_difference FROM chest_sales_transactions WHERE seller IN (${placeholders})
      `;

    const result = await pool.query(queryText, my_list);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/mission_rewards", async (req, res) => {
  try {
    const timeframe = req.query.mode;
    let my_list = req.query.walletList;

    if (typeof my_list === "string") {
      my_list = my_list.split();
    }
    const placeholders = my_list.map((_, index) => `$${index + 1}`).join(", ");

    const queryText =
      timeframe === "Weekly"
        ? `
        SELECT sum(amount) as amount, reward FROM chest_redemption_transactions WHERE BLOCK_TIMESTAMP >= (CURRENT_DATE - interval '7 days') AND 
        BLOCK_TIMESTAMP < CURRENT_DATE AND TX_TO IN (${placeholders}) AND (reward = 'FOXY' OR reward = 'SOL') GROUP BY reward
      `
        : `
        SELECT sum(amount) as amount, reward FROM chest_redemption_transactions WHERE TX_TO IN (${placeholders}) AND (reward = 'FOXY' OR reward = 'SOL') GROUP BY reward
      `;

    const result = await pool.query(queryText, my_list);
    res.json(result.rows);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Implement the other routes similarly for get_mission_rewards and get_chest_sales

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
