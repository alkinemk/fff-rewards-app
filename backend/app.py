from flask import Flask, request, jsonify
from flask_cors import CORS
import psycopg2

app = Flask(__name__)
CORS(app)


@app.route('/api/staking_rewards', methods=['GET'])
def get_staking_rewards():
    timeframe = request.args.get('mode')
    my_list = request.args.getlist('walletList')
    my_list = tuple(my_list)
    conn = psycopg2.connect(host="localhost", database="fff",
                            user="alkine", password="201615")
    cur = conn.cursor()
    if timeframe == 'Weekly':
        cur.execute("SELECT sum(amount) as amount FROM staking_transactions WHERE BLOCK_TIMESTAMP >= (CURRENT_DATE - interval '7 days') AND BLOCK_TIMESTAMP < CURRENT_DATE AND TX_TO IN %s",
                    (my_list,))
    else:
        cur.execute("SELECT sum(amount) as amount FROM staking_transactions WHERE TX_TO IN %s",
                    (my_list,))
    data = cur.fetchall()
    cur.close()
    conn.close()
    return jsonify(data)


@app.route('/api/mission_rewards', methods=['GET'])
def get_mission_rewards():
    timeframe = request.args.get('mode')
    my_list = request.args.getlist('walletList')
    my_list = tuple(my_list)
    conn = psycopg2.connect(host="localhost", database="fff",
                            user="alkine", password="201615")
    cur = conn.cursor()
    if timeframe == 'Weekly':
        cur.execute("SELECT sum(amount) as amount, reward FROM chest_redemption_transactions WHERE BLOCK_TIMESTAMP >= (CURRENT_DATE - interval '7 days') AND BLOCK_TIMESTAMP < CURRENT_DATE AND TX_TO IN %s AND (reward = 'FOXY' OR reward = 'SOL') GROUP BY reward",
                    (my_list,))
    else:
        cur.execute(
            "SELECT sum(amount) as amount, reward FROM chest_redemption_transactions WHERE TX_TO IN %s AND (reward = 'FOXY' OR reward = 'SOL') GROUP BY reward", (my_list,))

    data = cur.fetchall()
    cur.close()
    conn.close()
    print(data)
    return jsonify(data)


@app.route('/api/chest_sales', methods=['GET'])
def get_chest_sales():
    timeframe = request.args.get('mode')
    my_list = request.args.getlist('walletList')
    my_list = tuple(my_list)
    conn = psycopg2.connect(host="localhost", database="fff",
                            user="alkine", password="201615")
    cur = conn.cursor()
    if timeframe == 'Weekly':
        print("""
    SELECT SUM(seller_amount) - SUM(buyer_amount) AS amount_difference
    FROM (
        SELECT 
            CASE WHEN buyer IN %s THEN sol_amount ELSE 0 END AS buyer_amount,
            CASE WHEN seller IN %s THEN sol_amount ELSE 0 END AS seller_amount
        FROM chest_sales_transactions
        WHERE BLOCK_TIMESTAMP >= (CURRENT_DATE - interval '7 days') AND BLOCK_TIMESTAMP < CURRENT_DATE and (buyer IN %s OR seller IN %s) 
    ) as t""", (my_list, my_list, my_list, my_list,))
        cur.execute(
            """
    SELECT SUM(seller_amount) - SUM(buyer_amount) AS amount_difference
    FROM (
        SELECT 
            CASE WHEN buyer IN %s THEN sol_amount ELSE 0 END AS buyer_amount,
            CASE WHEN seller IN %s THEN sol_amount ELSE 0 END AS seller_amount
        FROM chest_sales_transactions
        WHERE BLOCK_TIMESTAMP >= (CURRENT_DATE - interval '7 days') AND BLOCK_TIMESTAMP < CURRENT_DATE and (buyer IN %s OR seller IN %s) 
    ) as t""", (my_list, my_list, my_list, my_list,))
    else:
        cur.execute(
            """
    SELECT SUM(seller_amount) - SUM(buyer_amount) AS amount_difference
    FROM (
        SELECT 
            CASE WHEN buyer IN %s THEN sol_amount ELSE 0 END AS buyer_amount,
            CASE WHEN seller IN %s THEN sol_amount ELSE 0 END AS seller_amount
        FROM chest_sales_transactions
        WHERE buyer IN %s  OR seller IN %s 
    ) as t""", (my_list, my_list, my_list, my_list,))

    data = cur.fetchall()
    cur.close()
    conn.close()
    print(data)
    return jsonify(data)


if __name__ == '__main__':
    app.run()
