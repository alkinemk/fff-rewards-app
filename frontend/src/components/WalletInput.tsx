import { useState, useEffect, ReactNode } from "react";
//import "./App.css";
import View from "./View";
import ToggleButton from "./ToggleButton";
import "./WalletInput.css";

type Price = {
  [key: string]: number;
};

type Cryptoccurency = {
  [key: string]: Price;
};

const getMissionsRewards = (walletList: Array<string>, mode: string) => {
  const params = new URLSearchParams();
  walletList.forEach((address) => params.append("walletList", address));
  params.append("mode", mode);
  const response = fetch(
    `http://127.0.0.1:5000/api/mission_rewards?${params.toString()}`
  );
  return response;
};

const getStakingRewards = (walletList: Array<string>, mode: string) => {
  const params = new URLSearchParams();
  walletList.forEach((address) => params.append("walletList", address));
  params.append("mode", mode);
  const response = fetch(
    `http://127.0.0.1:5000/api/staking_rewards?${params.toString()}`
  );
  return response;
};

const getChestSales = (walletList: Array<string>, mode: string) => {
  const params = new URLSearchParams();
  walletList.forEach((address) => params.append("walletList", address));
  params.append("mode", mode);
  const response = fetch(
    `http://127.0.0.1:5000/api/chest_sales?${params.toString()}`
  );
  return response;
};

function WalletInput() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasFirstRequestBeenSent, setHasFirstRequestBeenSent] =
    useState<boolean>(false);

  const [missionsResults, setMissionsResults] = useState<
    Array<Array<number | string>>
  >([
    [0, "FOXY"],
    [0, "SOL"],
  ]);
  const [stakingResults, setStakingResults] = useState(0);
  const [chestSalesResult, setChestSalesResults] = useState(0);

  const [walletList, setWalletList] = useState<Array<string>>([""]);

  const [prices, setPrices] = useState<Price>({});
  const [mode, setMode] = useState<boolean>(false);

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
  }, []);

  const onWalletClick = async () => {
    setIsLoading(true);

    try {
      let value;
      if (mode) {
        value = "AllTime";
      } else {
        value = "Weekly";
      }
      const [res1, res2, res3] = await Promise.all([
        getMissionsRewards(walletList, value),
        getStakingRewards(walletList, value),
        getChestSales(walletList, value),
      ]);

      const data1 = await res1.json();
      const data2 = await res2.json();
      const data3 = await res3.json();

      if (data1.length > 0) {
        setMissionsResults(data1);
      } else {
        setMissionsResults([
          [0, "FOXY"],
          [0, "SOL"],
        ]);
      }

      setStakingResults(data2[0][0]);
      setChestSalesResults(data3[0][0]);
      // do something with the data
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      setHasFirstRequestBeenSent(true);
    }
  };

  const handleWalletAdd = () => {
    setWalletList([...walletList, ""]);
  };

  const handleWalletRemove = (index: number) => {
    const newWalletList = [...walletList];
    newWalletList.splice(index, 1);
    setWalletList(newWalletList);
  };

  const handleWalletChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = e.target;
    const list = [...walletList];
    list[index] = value;
    setWalletList(list);
  };

  return (
    <>
      <div className="flex justify-center pt-8 gap-2">
        <div className="flex flex-col">
          <div className="flex flex-col mb-1">
            {walletList.map((wallet, index) => (
              <div key={index} className="flex flex-row">
                <label className="mb-1">
                  <input
                    className="sm:w-72 w-44 h-10 block px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-600 focus:ring-1 focus:ring-sky-600"
                    placeholder={`Enter your wallet ${index + 1}`}
                    id="wallet"
                    type="text"
                    value={wallet}
                    onChange={(e) => handleWalletChange(e, index)}
                  />
                </label>
                {index === 0 && (
                  <button
                    className="add h-10 ml-1 leading-6 px-2 py-2 font-semibold text-sm shadow rounded-md text-white transition ease-in-out duration-150 flex-1"
                    onClick={handleWalletAdd}
                  >
                    Add wallet
                  </button>
                )}

                {walletList.length > 1 && index !== 0 && (
                  <button
                    className="remove h-10 leading-6 ml-1 px-2 py-2 font-semibold text-sm shadow rounded-md text-white transition ease-in-out duration-150 green-bg flex-1"
                    onClick={() => handleWalletRemove(index)}
                  >
                    Remove wallet
                  </button>
                )}
              </div>
            ))}
          </div>
          <ToggleButton
            textLeft={"Weekly"}
            textRight={"All-time"}
            id={"view"}
            mode={mode}
            onClick={setMode}
          ></ToggleButton>
          <div className="mt-3 mb-6 flex justify-center">
            {isLoading ? (
              <button
                disabled={isLoading}
                onClick={onWalletClick}
                type="button"
                className="h-10 flex justify-center items-center leading-6  px-3 py-2 font-semibold text-sm shadow rounded-md text-white transition ease-in-out duration-150 cursor-not-allowed green-bg"
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
                className="h-10 px-3 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white green-bg w-24"
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
      {!isLoading && (
        <div>
          <View
            mode={mode}
            missionsResults={missionsResults}
            prices={prices}
            stakingResults={stakingResults}
            chestSalesResults={chestSalesResult}
            isLoading={isLoading}
            hasFirstRequestBeenSent={hasFirstRequestBeenSent}
          ></View>
        </div>
      )}
    </>
  );
}

export default WalletInput;
