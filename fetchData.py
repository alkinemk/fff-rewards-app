
import psycopg2

from shroomdk import ShroomDK


# Initialize `ShroomDK` with your API Key
sdk = ShroomDK("512ed849-a736-4f9e-b2f3-9fea3c854c3e")


def get_staking_transactions_sql():
    sql = f"""
    SELECT
        BLOCK_TIMESTAMP,
        TX_ID,
        TX_TO,
        AMOUNT
    FROM
        solana.core.fact_transfers
    WHERE
        BLOCK_TIMESTAMP >= TO_TIMESTAMP_NTZ('2021-10-11')
        --BLOCK_TIMESTAMP >= TO_TIMESTAMP_NTZ('2023-04-04')
       
        AND TX_FROM = 'Gd18t9bFpigpnEWpYkXD6bhcbtKW5szN2HkgmFUtsM3m' 
        AND MINT = 'FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq'
    """

    return sql


def get_chests_redemption_transactions_sql():
    sql = f"""
    SELECT
      BLOCK_TIMESTAMP,
      TX_ID,
      TX_TO,
      CASE 
        WHEN mint = 'So11111111111111111111111111111111111111112' THEN 'SOL'
        WHEN mint = '7rgProGmvf8mtNW4KB4avwnqvxPJoRfmm5khDG4bmNSm' THEN 'FAME token 5K'
        WHEN mint = 'HwRQ7aoFNEUfPY13id6URaVf76V4E4LEZit9JqWDhgMg' THEN 'FAME token 1K'
        WHEN mint = 'FoXyMu5xwXre7zEoSvzViRk3nGawHUp9kUh97y2NDhcq' THEN 'FOXY'
        -- rooms
        WHEN mint = '6uNR1sCzqsrKLANmcG9PHbtW7LKAbnxw1JuL1XeEpFZe' THEN 'Den Room(s)' --angel
        WHEN mint = 'ACrfXQRiGahvm6pnKfDKBFyLg2DXM34zjyegsYpWrZdi' THEN 'Den Room(s)' --castle
        WHEN mint = 'uGb5a8oFhqDKQBLFyPbFEcCEFw7VbG34t78jtwnJKXT' THEN 'Den Room(s)' --cope
        WHEN mint = 'Gx4SS3Vh919pmf2LmUPWvFj1yAY2xtWCdNhAytns7H1E' THEN 'Den Room(s)' --spy
        WHEN mint = 'Rxp1ak3ENx5qvx7YSsfnifhgWBtvQFmvaCt1yLRi13d' THEN 'Den Room(s)' --school
        WHEN mint = '3o4uYAWgycyx5tdm6P4LPc1qo75mvrCVKgWNtbf743HH' THEN 'Den Room(s)' --centurion
        WHEN mint = '5xUUiF2fJ29S7CUPTxNSvaKB7SsXeauaHdNPPEa1x44j' THEN 'Den Room(s)' --vampire
        WHEN mint = '9uYusWbg3n6JW5xJSR3qnqJHYX6zzb2f6qqUD4vdKCjD' THEN 'Den Room(s)' --viking
        WHEN mint = '4KcpMxenYxJ8FDXZgY6xzHpYEqMn4evTiitnQJdzeEBm' THEN 'Den Room(s)' --beach
        WHEN mint = 'F2DQCgzgdFtSrstdzgvrtv5KEuTNW2m1wYS2Mp8peuHT' THEN 'Den Room(s)' --beard
        WHEN mint = 'GSAjejzFEwooY4ZvjoWZ72tVJ7ypz813h2DzhPqFNysf' THEN 'Den Room(s)' --solana
        WHEN mint = '8zx2FEeqy6XoCwUC1xzaFibt83km4wo6hZzf94Nwhqtp' THEN 'Den Room(s)' --safari
        WHEN mint = 'EcFVCjCs2dvu9bmUPRjzAqDqAfdYVBmUkKoNQd7wX8Au' THEN 'Den Room(s)' --pirate
        WHEN mint = '8kqwZUKYhZ4yvq1skNbrYzVzUP3TrpazjipvqhJU5dKR' THEN 'Den Room(s)' --MT
        WHEN mint = '241eaHHGFmCLUGhDzSWiRamYvCEYtQCokJD1gMWbjYje' THEN 'Den Room(s)' --FASA MARS
        WHEN mint = '4w8ggWZERyAh9U3yj5oRs72FyxVoCLc6sGN5y9Z65jYF' THEN 'Den Room(s)' --trading room
        WHEN mint = '92vDRBiXoqXcmWXoSDoDm3Ff4ysGLWw1dtp9576rxbEy' THEN 'Den Room(s)' --arcade
        WHEN mint = 'EKfeKoZjsJJJhz8ESnBFwJ8LRBPhrik8wn5vUdH8kTHi' THEN 'Den Room(s)' --alien
        WHEN mint = '4FAWETTfvcaj6Y72RhokZqxrM5monZgXqCU5uduvRRVg' THEN 'Den Room(s)' --FASA MOON
        WHEN mint = '2WfDnG2wG5tcgSRdRSooqFp5toXEtpbUzo1BKhbkC4T6' THEN 'Den Room(s)' --captain
        WHEN mint = 'GZnZHKWS4AeTye4JUM8DctVX7F3u8gizU4FgYxjbebvu' THEN 'Den Room(s)' --vault
        WHEN mint = 'Ft4R9cxeoMpm7hKvpZfNVnLpMXQ7egCSSdG2NLiJwssv' THEN 'Den Room(s)' --gym 
        WHEN mint = 'FTj6ePi7peqDx6gZuZH2CWuc9kHQw9CXxFnSbybZm3kM' THEN 'Den Room(s)' --poker 
        WHEN mint = 'GFSPXg4xb3N89CsqNifpZA4Fi2TU6nvEKvaZJdnyRgEG' THEN 'Den Room(s)' --nftgfx
        WHEN mint = '79xAdhAF6YqUWtpkjdoQePb3apYzBmn8B8Jq9uhLkm76' THEN 'Den Room(s)' --mine
        WHEN mint = '9FjDuH9YmNhbnvmW3PSUMbFPYD6nFicsgyesHzYqxkgt' THEN 'Den Room(s)' --hobbit
        WHEN mint = '6Px3qGtWCaCDqHXgLcPM54mc41oYSjuFqdUmEuQM5ZDL' THEN 'Den Room(s)' --Jambo Mamblo
        WHEN mint = '2A41FCwu44F8x81BQ4Dw8ED4U9FxtRmqhZqhSc5yQATN' THEN 'Den Room(s)' --Solana Storm
        WHEN mint = '7FZtyptdeyp5dku9nxjF23dwsc4RpC4cuqb4v55SP3Uh' THEN 'Den Room(s)' --bape
        WHEN mint = 'HFNVNFmq7Zna6CX75bsxuFkHSEAkDiM9acQQVjocjE6X' THEN 'Den Room(s)' --pesky
        WHEN mint = '7uR8rG1e2QKB1ew1xR49KNx32F6i2KxgfxkSZfnrCYjK' THEN 'Den Room(s)' --degen dao 
        WHEN mint = 'BmTeMzkPyiZ1PXPu4XLKvp7FokTjRzM1fA1eqoimKSho' THEN 'Den Room(s)' --bitmon
        WHEN mint = 'CSkJBYCUVLQv2kaWwJhig8jn8dUPqh8mbZogEhmJXqNg' THEN 'Den Room(s)' --grim syndicate
        WHEN mint = '2LPxSvgoM1XxHhMEj1Hx5bLpJFzAma8DUswHscUDnFyW' THEN 'Den Room(s)' --ggsg
        WHEN mint = '6B2U8RW7ydpxJrPAtM83YX3AsyBYGH1zZaukEa9yAoar' THEN 'Den Room(s)' --gargolon
        WHEN mint = '2nFtTdqeJC2pUzE1jCwTBe3fVJRvQ4aWs2WfrUKiDnmE' THEN 'Den Room(s)' --gooney tunes
        WHEN mint = '7zw2AzLzRwLiYQaP4q52A8S42pSAF4UuWaZjLBRS8d2B' THEN 'Den Room(s)' --degods
        WHEN mint = '93XnJzyicPcR9CWYkVyT5jNV4Piyqt1n1KkseVrzewUC' THEN 'Den Room(s)' --igloo
        WHEN mint = '45FNGR5T2y8UWeZtZQVcpbce6rum8zAserkMwMYpxAhg' THEN 'Den Room(s)' --igloo
        WHEN mint = 'naz5VZSh58pE2HaEQJDGX7z1yspUU5Ty4RJNu7S57zu' THEN 'Den Room(s)' --sea shanties
        WHEN mint = '2ahwvnHgm3gzcvokVzaUxENBhPuUX9aJ2gB5X7X78dvM' THEN 'Den Room(s)' --solsteads
        WHEN mint = '3FzA779JPYGGBqpJVfzQBAmq2gYRq78GLkSsFgtLwH9v' THEN 'Den Room(s)' --portals 
        WHEN mint = '8vhEm5Fy6gqVbZ7jJexiV1YtexucJykKy4d3U5bAY1CY' THEN 'Den Room(s)' --monkettes
        -- merch
        WHEN mint = 'BdL575xsvzQmHmgmHYPKd1uCWMDjrrWSj3uDdkqPqEBu' THEN 'T-Shirt Merch Token' --hyblinx
        WHEN mint = '2oiKe9Qw5GQDj5MxeeJn8tYRuRySFXgyqdBGQcrpRzGk' THEN 'T-Shirt Merch Token' --scum
        WHEN mint = '2F1T1DdRCQ9f28gtiJhUcXwHJmVMZ1rArLsRmHMHcBCc' THEN 'Hoodie Merch Token'
        WHEN mint = '66yyPmCXWdBpQryKi2ZAQdJTkjKPzcpdYY7jCCBxFtwL' THEN 'Cup Token'
        WHEN mint = '5JQutruod74Ltg1pcpt2Y354ed6RLgwbbxYc8P47aYBY' THEN 'Poster Token'
        WHEN mint = 'Gf3JQHzx8qKjshdXhbE4Mh2m2arfE9gVhLeXUk6Xagbz' THEN 'Metal Print Token'
        WHEN mint = '4SSjVmxXvAmxe5SdTohsg1ESqGjtHpMKdn5Hh2SHScxh' THEN 'Slabz Token'
        -- limited time rewards
        WHEN mint = '3y4PTvbVgcReTNjEra5J57ZeHBKSJaSDYpaUG2RSbcQh' THEN 'Dummy Reward Token'
        WHEN mint = 'GXa9aoN7XgmUymHH1cvomj8caTxHE9UU2opWqHY6XDRx' THEN 'Forebear Reward Token'
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
      AMOUNT
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
      or mint = '3y4PTvbVgcReTNjEra5J57ZeHBKSJaSDYpaUG2RSbcQh'
      or mint = 'GXa9aoN7XgmUymHH1cvomj8caTxHE9UU2opWqHY6XDRx'
    )
    """
    return sql


def get_chest_sales_transactions_sql():
    sql = f"""
    WITH
  sol AS (
    SELECT
      BLOCK_TIMESTAMP,
      TX_ID,
      TX_TO as seller,
      AMOUNT AS sol_amount
    FROM
      solana.core.fact_transfers
    WHERE
      BLOCK_TIMESTAMP >= TO_TIMESTAMP_NTZ('2022-02-20')
      AND MINT = 'So11111111111111111111111111111111111111112'
      AND TX_TO != '2x3yujqB7LCMdCxV7fiZxPZStNy7RTYqWLSvnqtqjHR6'
      AND amount != 0.5
      AND amount != 1
      AND amount != 5
      AND amount != 10
      AND amount != 0
  ),
  rewards AS (
    SELECT
      TX_ID,
      tx_to as buyer
    FROM
      solana.core.fact_transfers
    WHERE
      BLOCK_TIMESTAMP >= TO_TIMESTAMP_NTZ('2022-02-20')
      AND (
        MINT = 'ChestbxGy3ybsz7TdKCpErfCKUfWTU9V8e4K3afmpKTT'
        OR MINT = 'rArEY9MfSHK7Gvi1AXoHHsLJhhXAhfYhitYQMiEAdx4'
        OR MINT = 'ChEsTBFtT4PNEDTEfpvREFUoALMjaUhM5HyCh1jJnQn2'
        or mint = '7rgProGmvf8mtNW4KB4avwnqvxPJoRfmm5khDG4bmNSm'
        or mint = 'HwRQ7aoFNEUfPY13id6URaVf76V4E4LEZit9JqWDhgMg'
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
        or mint = '3y4PTvbVgcReTNjEra5J57ZeHBKSJaSDYpaUG2RSbcQh'
        or mint = 'GXa9aoN7XgmUymHH1cvomj8caTxHE9UU2opWqHY6XDRx'
      )
      AND TX_ID != '2RXVrNReW1rTYpYEYnrSsT4SJy8cRwtTwzC66u5hMKibzgCj51DmpXGnccY59CyiozVXxuYAgXRnB87qAxboyCFo'
      AND TX_ID IN (
        SELECT
          TX_ID
        FROM
          SOL
      )
  )
SELECT
  *
FROM
  SOL
  JOIN REWARDS USING (TX_ID)
    """

    return sql


def get_data(sql):
    query_result_set = sdk.query(
        sql=sql, page_size=100000)
    return query_result_set


def get_data_and_save_to_db(table):

    page_number = 1
    while True:

        # sql = get_staking_transactions_sql()
        sql = get_chests_redemption_transactions_sql()

        query_result_set = sdk.query(
            sql=sql, page_size=100000, page_number=page_number)

        if query_result_set.records != None:
            save_to_db(query_result_set, table)

        if query_result_set.run_stats.record_count == 0:
            break
        page_number += 1


def save_to_db(query_result_set, table: str):
    # connect to database
    conn = psycopg2.connect(host="localhost", database="fff",
                            user="alkine", password="201615")
    cur = conn.cursor()

    for record in query_result_set.records:
        tx_id = record['tx_id']
        block_timestamp = record['block_timestamp']

        # seller = record['seller']
        # buyer = record['buyer']
        # sol_amount = record['sol_amount']

        tx_to = record['tx_to']
        reward = record['reward']
        amount = record['amount']
        # buyer = record["buyer"]
        # cur.execute(
        #     f"INSERT INTO {table} VALUES ('{tx_id}', '{block_timestamp}', '{seller}', '{buyer}', '{sol_amount}')")
        cur.execute(
            f"INSERT INTO {table} VALUES ('{tx_id}', '{block_timestamp}', '{tx_to}', '{reward}','{amount}')")

    # commit changes and close database connection
    conn.commit()
    cur.close()
    conn.close()


get_data_and_save_to_db("chest_redemption_transactions")
