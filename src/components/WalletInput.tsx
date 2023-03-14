import { useState, useEffect } from "react";
//import "./App.css";
import { Flipside, Query } from "@flipsidecrypto/sdk";
import View from "./View";
import ToggleButton from "./ToggleButton";

interface Record {
  reward: string;
  amount: string;
}

type Price = {
  [key: string]: number;
};

type Cryptoccurency = {
  [key: string]: Price;
};

//Initialize `Flipside` with your API key
const flipside = new Flipside(
  process.env.REACT_APP_API_KEY!,
  "https://node-api.flipsidecrypto.com"
);

const getChestQuery = (walletList: Array<string>) => {
  const wallets = `TX_TO = ` + `'` + walletList.join(`' AND TX_TO = '`) + `'`;
  const query: Query = {
    sql: `
    SELECT
    CASE
      WHEN mint = 'So11111111111111111111111111111111111111112' THEN 'SOL'
      WHEN mint = '7rgProGmvf8mtNW4KB4avwnqvxPJoRfmm5khDG4bmNSm' THEN 'FAME token 5K'
      WHEN mint = 'HwRQ7aoFNEUfPY13id6URaVf76V4E4LEZit9JqWDhgMg' THEN 'FAME token 1K'
      WHEN mint = 'FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq' THEN 'FOXY'
      -- rooms
      WHEN mint = '6uNR1sCzqsrKLANmcG9PHbtW7LKAbnxw1JuL1XeEpFZe' THEN 'Room' --angel
      WHEN mint = 'ACrfXQRiGahvm6pnKfDKBFyLg2DXM34zjyegsYpWrZdi' THEN 'Room' --castle
      WHEN mint = 'uGb5a8oFhqDKQBLFyPbFEcCEFw7VbG34t78jtwnJKXT' THEN 'Room' --cope
      WHEN mint = 'Gx4SS3Vh919pmf2LmUPWvFj1yAY2xtWCdNhAytns7H1E' THEN 'Room' --spy
      WHEN mint = 'Rxp1ak3ENx5qvx7YSsfnifhgWBtvQFmvaCt1yLRi13d' THEN 'Room' --school
      WHEN mint = '3o4uYAWgycyx5tdm6P4LPc1qo75mvrCVKgWNtbf743HH' THEN 'Room' --centurion
      WHEN mint = '5xUUiF2fJ29S7CUPTxNSvaKB7SsXeauaHdNPPEa1x44j' THEN 'Room' --vampire
      WHEN mint = '9uYusWbg3n6JW5xJSR3qnqJHYX6zzb2f6qqUD4vdKCjD' THEN 'Room' --viking
      WHEN mint = '4KcpMxenYxJ8FDXZgY6xzHpYEqMn4evTiitnQJdzeEBm' THEN 'Room' --beach
      WHEN mint = 'F2DQCgzgdFtSrstdzgvrtv5KEuTNW2m1wYS2Mp8peuHT' THEN 'Room' --beard
      WHEN mint = 'GSAjejzFEwooY4ZvjoWZ72tVJ7ypz813h2DzhPqFNysf' THEN 'Room' --solana
      WHEN mint = '8zx2FEeqy6XoCwUC1xzaFibt83km4wo6hZzf94Nwhqtp' THEN 'Room' --safari
      WHEN mint = 'EcFVCjCs2dvu9bmUPRjzAqDqAfdYVBmUkKoNQd7wX8Au' THEN 'Room' --pirate
      WHEN mint = '8kqwZUKYhZ4yvq1skNbrYzVzUP3TrpazjipvqhJU5dKR' THEN 'Room' --MT
      WHEN mint = '241eaHHGFmCLUGhDzSWiRamYvCEYtQCokJD1gMWbjYje' THEN 'Room' --FASA MARS
      WHEN mint = '4w8ggWZERyAh9U3yj5oRs72FyxVoCLc6sGN5y9Z65jYF' THEN 'Room' --trading room
      WHEN mint = '92vDRBiXoqXcmWXoSDoDm3Ff4ysGLWw1dtp9576rxbEy' THEN 'Room' --arcade
      WHEN mint = 'EKfeKoZjsJJJhz8ESnBFwJ8LRBPhrik8wn5vUdH8kTHi' THEN 'Room' --alien
      WHEN mint = '4FAWETTfvcaj6Y72RhokZqxrM5monZgXqCU5uduvRRVg' THEN 'Room' --FASA MOON
      WHEN mint = '2WfDnG2wG5tcgSRdRSooqFp5toXEtpbUzo1BKhbkC4T6' THEN 'Room' --captain
      WHEN mint = 'GZnZHKWS4AeTye4JUM8DctVX7F3u8gizU4FgYxjbebvu' THEN 'Room' --vault
      WHEN mint = 'Ft4R9cxeoMpm7hKvpZfNVnLpMXQ7egCSSdG2NLiJwssv' THEN 'Room' --gym 
      WHEN mint = 'FTj6ePi7peqDx6gZuZH2CWuc9kHQw9CXxFnSbybZm3kM' THEN 'Room' --poker 
      WHEN mint = 'GFSPXg4xb3N89CsqNifpZA4Fi2TU6nvEKvaZJdnyRgEG' THEN 'Room' --nftgfx
      WHEN mint = '79xAdhAF6YqUWtpkjdoQePb3apYzBmn8B8Jq9uhLkm76' THEN 'Room' --mine
      WHEN mint = '9FjDuH9YmNhbnvmW3PSUMbFPYD6nFicsgyesHzYqxkgt' THEN 'Room' --hobbit
      WHEN mint = '6Px3qGtWCaCDqHXgLcPM54mc41oYSjuFqdUmEuQM5ZDL' THEN 'Room' --Jambo Mamblo
      WHEN mint = '2A41FCwu44F8x81BQ4Dw8ED4U9FxtRmqhZqhSc5yQATN' THEN 'Room' --Solana Storm
      WHEN mint = '7FZtyptdeyp5dku9nxjF23dwsc4RpC4cuqb4v55SP3Uh' THEN 'Room' --bape
      WHEN mint = 'HFNVNFmq7Zna6CX75bsxuFkHSEAkDiM9acQQVjocjE6X' THEN 'Room' --pesky
      WHEN mint = '7uR8rG1e2QKB1ew1xR49KNx32F6i2KxgfxkSZfnrCYjK' THEN 'Room' --degen dao 
      WHEN mint = 'BmTeMzkPyiZ1PXPu4XLKvp7FokTjRzM1fA1eqoimKSho' THEN 'Room' --bitmon
      WHEN mint = 'CSkJBYCUVLQv2kaWwJhig8jn8dUPqh8mbZogEhmJXqNg' THEN 'Room' --grim syndicate
      WHEN mint = '2LPxSvgoM1XxHhMEj1Hx5bLpJFzAma8DUswHscUDnFyW' THEN 'Room' --ggsg
      WHEN mint = '6B2U8RW7ydpxJrPAtM83YX3AsyBYGH1zZaukEa9yAoar' THEN 'Room' --gargolon
      WHEN mint = '2nFtTdqeJC2pUzE1jCwTBe3fVJRvQ4aWs2WfrUKiDnmE' THEN 'Room' --gooney tunes
      WHEN mint = '7zw2AzLzRwLiYQaP4q52A8S42pSAF4UuWaZjLBRS8d2B' THEN 'Room' --degods
      WHEN mint = '93XnJzyicPcR9CWYkVyT5jNV4Piyqt1n1KkseVrzewUC' THEN 'Room' --igloo
      WHEN mint = '45FNGR5T2y8UWeZtZQVcpbce6rum8zAserkMwMYpxAhg' THEN 'Room' --igloo
      WHEN mint = 'naz5VZSh58pE2HaEQJDGX7z1yspUU5Ty4RJNu7S57zu' THEN 'Room' --sea shanties
      WHEN mint = '2ahwvnHgm3gzcvokVzaUxENBhPuUX9aJ2gB5X7X78dvM' THEN 'Room' --solsteads
      WHEN mint = '3FzA779JPYGGBqpJVfzQBAmq2gYRq78GLkSsFgtLwH9v' THEN 'Room' --portals 
      WHEN mint = '8vhEm5Fy6gqVbZ7jJexiV1YtexucJykKy4d3U5bAY1CY' THEN 'Room' --monkettes
      -- merch
      WHEN mint = 'BdL575xsvzQmHmgmHYPKd1uCWMDjrrWSj3uDdkqPqEBu' THEN 'T-Shirt' --hyblinx
      WHEN mint = '2oiKe9Qw5GQDj5MxeeJn8tYRuRySFXgyqdBGQcrpRzGk' THEN 'T-Shirt' --scum
      WHEN mint = '2F1T1DdRCQ9f28gtiJhUcXwHJmVMZ1rArLsRmHMHcBCc' THEN 'Hoodie'
      WHEN mint = '66yyPmCXWdBpQryKi2ZAQdJTkjKPzcpdYY7jCCBxFtwL' THEN 'Cup'
      WHEN mint = '5JQutruod74Ltg1pcpt2Y354ed6RLgwbbxYc8P47aYBY' THEN 'Poster'
      WHEN mint = 'Gf3JQHzx8qKjshdXhbE4Mh2m2arfE9gVhLeXUk6Xagbz' THEN 'Metal Print'
      WHEN mint = '4SSjVmxXvAmxe5SdTohsg1ESqGjtHpMKdn5Hh2SHScxh' THEN 'Slabz'
      -- valuable items
      WHEN mint = '8CALfhBKfwVgcAvcGUzDcbPdnB3tXEwjDCPAnu71NRAh' THEN 'Famous Fox Den'
      WHEN mint = '3mbUWXsS1y2vMS1TZD7yzB7WqLSNF1PxTRJHd8wFZyQj' THEN 'Orange Box'
      WHEN mint = 'AQpqbTsSvNDDfUckAZcfi9M7p15rkFqUZ4fstQeeRj91' THEN 'Golden Box'
      WHEN mint = 'HfdBFL7RRd8x9kk3cYUa8utiNBLwKDcBmHytR72ZysCL' THEN 'WL token'
      WHEN mint = '4ykF9h5ooDBsdDapnGptRg7EeQ59eerWTFYjDcHYKYnA' THEN 'TFF'
      WHEN mint = '4oi6xY4BVxxYFefGX1fBUxCaqjHYs3c3ZcLoAuxU99r3' THEN 'FFF'
      WHEN mint = 'C4tVPRoHfD5VGeiumYTdNA9NwycPRk9PwPj6QQtZ8VvL' THEN 'Famous Gem'
      WHEN mint = 'BkwMVyTe9vmmDdHWoVt3WVkTSb5BF8jCmLcUotvyHNKT' THEN 'Wormhole'
      WHEN mint = 'EiHsh555QZoCebkU8bRCBGvMUJ9ymqLibVb73bmBvS4d' THEN 'Unfreeze Ray'
    END AS reward,
    sum(amount) AS AMOUNT
  FROM
    solana.core.fact_transfers
  WHERE
    BLOCK_TIMESTAMP >= TO_TIMESTAMP_NTZ('2022-02-20') 
    AND TX_FROM = '3vedckD9AnCNp7vEEnTUzVK6bWHEQgSpPRB7A5aS67kj'
    AND (
      mint = 'So11111111111111111111111111111111111111112'
      or mint = '7rgProGmvf8mtNW4KB4avwnqvxPJoRfmm5khDG4bmNSm'
      or mint = 'HwRQ7aoFNEUfPY13id6URaVf76V4E4LEZit9JqWDhgMg'
      or mint = 'FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq'
      or mint = '6uNR1sCzqsrKLANmcG9PHbtW7LKAbnxw1JuL1XeEpFZe'
      or mint = 'ACrfXQRiGahvm6pnKfDKBFyLg2DXM34zjyegsYpWrZdi'
      or mint = 'uGb5a8oFhqDKQBLFyPbFEcCEFw7VbG34t78jtwnJKXT'
      or mint = 'Gx4SS3Vh919pmf2LmUPWvFj1yAY2xtWCdNhAytns7H1E'
      or mint = 'Rxp1ak3ENx5qvx7YSsfnifhgWBtvQFmvaCt1yLRi13d'
      or mint = '3o4uYAWgycyx5tdm6P4LPc1qo75mvrCVKgWNtbf743HH'
      or mint = '5xUUiF2fJ29S7CUPTxNSvaKB7SsXeauaHdNPPEa1x44j'
      or mint = '9uYusWbg3n6JW5xJSR3qnqJHYX6zzb2f6qqUD4vdKCjD'
      or mint = '4KcpMxenYxJ8FDXZgY6xzHpYEqMn4evTiitnQJdzeEBm'
      or mint = 'F2DQCgzgdFtSrstdzgvrtv5KEuTNW2m1wYS2Mp8peuHT'
      or mint = 'GSAjejzFEwooY4ZvjoWZ72tVJ7ypz813h2DzhPqFNysf'
      or mint = '8zx2FEeqy6XoCwUC1xzaFibt83km4wo6hZzf94Nwhqtp'
      or mint = 'EcFVCjCs2dvu9bmUPRjzAqDqAfdYVBmUkKoNQd7wX8Au'
      or mint = '8kqwZUKYhZ4yvq1skNbrYzVzUP3TrpazjipvqhJU5dKR'
      or mint = '241eaHHGFmCLUGhDzSWiRamYvCEYtQCokJD1gMWbjYje'
      or mint = '4w8ggWZERyAh9U3yj5oRs72FyxVoCLc6sGN5y9Z65jYF'
      or mint = '92vDRBiXoqXcmWXoSDoDm3Ff4ysGLWw1dtp9576rxbEy'
      or mint = 'EKfeKoZjsJJJhz8ESnBFwJ8LRBPhrik8wn5vUdH8kTHi'
      or mint = '4FAWETTfvcaj6Y72RhokZqxrM5monZgXqCU5uduvRRVg'
      or mint = '2WfDnG2wG5tcgSRdRSooqFp5toXEtpbUzo1BKhbkC4T6'
      or mint = 'GZnZHKWS4AeTye4JUM8DctVX7F3u8gizU4FgYxjbebvu'
      or mint = 'Ft4R9cxeoMpm7hKvpZfNVnLpMXQ7egCSSdG2NLiJwssv'
      or mint = 'FTj6ePi7peqDx6gZuZH2CWuc9kHQw9CXxFnSbybZm3kM'
      or mint = 'GFSPXg4xb3N89CsqNifpZA4Fi2TU6nvEKvaZJdnyRgEG'
      or mint = '79xAdhAF6YqUWtpkjdoQePb3apYzBmn8B8Jq9uhLkm76'
      or mint = '9FjDuH9YmNhbnvmW3PSUMbFPYD6nFicsgyesHzYqxkgt'
      or mint = '6Px3qGtWCaCDqHXgLcPM54mc41oYSjuFqdUmEuQM5ZDL'
      or mint = '2A41FCwu44F8x81BQ4Dw8ED4U9FxtRmqhZqhSc5yQATN'
      or mint = '7FZtyptdeyp5dku9nxjF23dwsc4RpC4cuqb4v55SP3Uh'
      or mint = 'HFNVNFmq7Zna6CX75bsxuFkHSEAkDiM9acQQVjocjE6X'
      or mint = '7uR8rG1e2QKB1ew1xR49KNx32F6i2KxgfxkSZfnrCYjK'
      or mint = 'BmTeMzkPyiZ1PXPu4XLKvp7FokTjRzM1fA1eqoimKSho'
      or mint = 'CSkJBYCUVLQv2kaWwJhig8jn8dUPqh8mbZogEhmJXqNg'
      or mint = '2LPxSvgoM1XxHhMEj1Hx5bLpJFzAma8DUswHscUDnFyW'
      or mint = '6B2U8RW7ydpxJrPAtM83YX3AsyBYGH1zZaukEa9yAoar'
      or mint = '2nFtTdqeJC2pUzE1jCwTBe3fVJRvQ4aWs2WfrUKiDnmE'
      or mint = '7zw2AzLzRwLiYQaP4q52A8S42pSAF4UuWaZjLBRS8d2B'
      or mint = '93XnJzyicPcR9CWYkVyT5jNV4Piyqt1n1KkseVrzewUC'
      or mint = '45FNGR5T2y8UWeZtZQVcpbce6rum8zAserkMwMYpxAhg'
      or mint = 'naz5VZSh58pE2HaEQJDGX7z1yspUU5Ty4RJNu7S57zu'
      or mint = '2ahwvnHgm3gzcvokVzaUxENBhPuUX9aJ2gB5X7X78dvM'
      or mint = '3FzA779JPYGGBqpJVfzQBAmq2gYRq78GLkSsFgtLwH9v'
      or mint = '8vhEm5Fy6gqVbZ7jJexiV1YtexucJykKy4d3U5bAY1CY'
      or mint = 'BdL575xsvzQmHmgmHYPKd1uCWMDjrrWSj3uDdkqPqEBu'
      or mint = '2oiKe9Qw5GQDj5MxeeJn8tYRuRySFXgyqdBGQcrpRzGk'
      or mint = '2F1T1DdRCQ9f28gtiJhUcXwHJmVMZ1rArLsRmHMHcBCc'
      or mint = '66yyPmCXWdBpQryKi2ZAQdJTkjKPzcpdYY7jCCBxFtwL'
      or mint = '5JQutruod74Ltg1pcpt2Y354ed6RLgwbbxYc8P47aYBY'
      or mint = 'Gf3JQHzx8qKjshdXhbE4Mh2m2arfE9gVhLeXUk6Xagbz'
      or mint = '4SSjVmxXvAmxe5SdTohsg1ESqGjtHpMKdn5Hh2SHScxh'
      or mint = '8CALfhBKfwVgcAvcGUzDcbPdnB3tXEwjDCPAnu71NRAh'
      or mint = '3mbUWXsS1y2vMS1TZD7yzB7WqLSNF1PxTRJHd8wFZyQj'
      or mint = 'AQpqbTsSvNDDfUckAZcfi9M7p15rkFqUZ4fstQeeRj91'
      or mint = 'HfdBFL7RRd8x9kk3cYUa8utiNBLwKDcBmHytR72ZysCL'
      or mint = '4ykF9h5ooDBsdDapnGptRg7EeQ59eerWTFYjDcHYKYnA'
      or mint = '4oi6xY4BVxxYFefGX1fBUxCaqjHYs3c3ZcLoAuxU99r3'
      or mint = 'C4tVPRoHfD5VGeiumYTdNA9NwycPRk9PwPj6QQtZ8VvL'
      or mint = 'BkwMVyTe9vmmDdHWoVt3WVkTSb5BF8jCmLcUotvyHNKT'
      or mint = 'EiHsh555QZoCebkU8bRCBGvMUJ9ymqLibVb73bmBvS4d'
    )
    AND (
      ${wallets}
    )
  GROUP BY
    REWARD
  ORDER BY
    amount DESC
  `,
    ttlMinutes: 10,
  };
  return query;
};

const getStakingQuery = (walletList: Array<string>) => {
  const wallets = `TX_TO = ` + `'` + walletList.join(`' AND TX_TO = '`) + `'`;
  const query: Query = {
    sql: `
      SELECT
      sum(amount) AS AMOUNT
      FROM
        solana.core.fact_transfers
      WHERE
        BLOCK_TIMESTAMP >= TO_TIMESTAMP_NTZ('2021-10-11')
        AND TX_FROM = 'Gd18t9bFpigpnEWpYkXD6bhcbtKW5szN2HkgmFUtsM3m'
        AND (
          ${wallets}
        )
        AND MINT = 'FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq'
      `,
    ttlMinutes: 10,
  };
  return query;
};

function WalletInput() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [chestResults, setChestResults] = useState<Array<Record>>();
  const [stakingResults, setStakingResults] = useState<
    string | number | boolean | null
  >();

  const [walletList, setWalletList] = useState<Array<string>>([]);
  const [hasFirstRequestBeenSent, setHasFirstRequestBeenSent] =
    useState<boolean>(false);

  const [prices, setPrices] = useState<Price>({});
  const [view, setView] = useState<boolean>(false);

  //   useEffect(() => {
  //     // fetch data
  //     const dataFetch = async () => {
  //       const foxy_data = await (
  //         await fetch(
  //           "https://api.coingecko.com/api/v3/simple/price?ids=solana%2Cfamous-fox-federation&vs_currencies=usd"
  //         )
  //       )
  //         .json()
  //         .then((data: Cryptoccurency) => {
  //           setFoxyPrice(data["famous-fox-federation"]["usd"]);
  //           setSolanaPrice(data["solana"]["usd"]);
  //         });

  //       //   set state when the data received
  //       //   setFoxyPrice(data);
  //     };

  //     dataFetch();
  //   }, []);

  useEffect(() => {
    // fetch data
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana%2Cfamous-fox-federation&vs_currencies=usd"
    )
      .then((response) => response.json())
      .then((data: Cryptoccurency) => {
        setPrices(
          Object.keys(data)
            .map((key) => ({
              [key]: data[key].usd,
            }))
            .reduce((previousValue, currentValue) => ({
              ...previousValue,
              ...currentValue,
            }))
        );
      });

    //   set state when the data received
    //   setFoxyPrice(data);
  }, []);

  const onWalletClick = async () => {
    setIsLoading(true);
    // let finalChestResults: Array<Record> = [];
    // let finalStakingResults: Array<string | number | boolean | null> = [];
    let query_1 = getChestQuery(walletList);
    let query_2 = getStakingQuery(walletList);

    // let test_query: Query = {
    //   sql: `
    //       SELECT
    //         TX_ID
    //       FROM
    //         solana.core.fact_transfers
    //       WHERE
    //         BLOCK_TIMESTAMP >= CURRENT_DATE - INTERVAL '1 DAY'
    //         AND BLOCK_TIMESTAMP < CURRENT_DATE
    //         AND TX_FROM = 'CtLWXktxQ8sWwNLaYuJP39j3PHpMeqm3BfPWgJsY18R3'
    //       `,
    //   ttlMinutes: 10,
    // };

    // const test = await Promise.all([flipside.query.run(test_query)]).then(
    //   (res) => {
    //     if (res.some((subRes) => subRes.error)) {
    //       setIsLoading(false);
    //       setHasFirstRequestBeenSent(false);
    //       return;
    //     }
    //     setIsLoading(false);
    //     setHasFirstRequestBeenSent(true);
    //   }
    // );

    const [query_1_result, query_2_result] = await Promise.all([
      flipside.query.run(query_1),
      flipside.query.run(query_2),
    ]).finally(() => {
      setIsLoading(false);
      setHasFirstRequestBeenSent(true);
    });

    const query_1_records = query_1_result.records?.map((record) => {
      const reward = record.reward?.toString()!;
      const amount = record.amount?.toString()!;
      return { reward, amount };
    });

    const query_2_records = query_2_result.records![0].amount;

    setChestResults(query_1_records);
    setStakingResults(query_2_records);
  };

  return (
    <>
      <div className="flex justify-center pt-8 gap-2">
        <label>
          <input
            className="w-72 sm:w-96 h-10 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
    focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
            placeholder="Enter your wallet"
            id={"firstInput"}
            type="text"
            onChange={(ev) => setWalletList([ev.target.value])}
            //onChange={(ev) => setWalletList([...walletList, ev.target.value])}
          />
        </label>
        {isLoading ? (
          <button
            disabled={isLoading}
            onClick={onWalletClick}
            type="button"
            className="h-10 leading-6 inline-flex items-center px-3 py-2 font-semibold text-sm shadow rounded-md text-white bg-sky-600  hover:bg-sky-700 transition ease-in-out duration-150 cursor-not-allowed"
          >
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Processing...
          </button>
        ) : (
          <button
            onClick={onWalletClick}
            type="button"
            className="h-10 px-3 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-sky-600  hover:bg-sky-700"
          >
            Submit
          </button>
        )}
      </div>
      {!isLoading && hasFirstRequestBeenSent && (
        <>
          {" "}
          <ToggleButton value={view} onClick={setView}></ToggleButton>
          <View
            view={view}
            chestResults={chestResults}
            prices={prices}
            stakingResults={stakingResults}
            isLoading={isLoading}
            hasFirstRequestBeenSent={hasFirstRequestBeenSent}
          ></View>
        </>
      )}
    </>
  );
}

export default WalletInput;
