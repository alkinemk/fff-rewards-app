import DetailedView from "./DetailedView";
import LiteView from "./LiteView";

type ChestsSales = {
  total_sol: string | number | boolean | null;
  total_chests: string | number | boolean | null;
};

type Record = {
  amount: string | number | boolean | null;
  reward: string | number | boolean | null;
};

// const testPrices: Price = {
//   "famous-fox-federation": 0.005,
//   solana: 20,
// };

type Price = {
  [key: string]: number;
};

interface Props {
  isLoading: boolean;
  hasFirstRequestBeenSent: boolean;
  missionsResults: Array<Record> | undefined;
  stakingResults: string | number | boolean | null | undefined;
  chestSalesResults: ChestsSales | undefined;
  prices: Price;
  view: boolean;

  tokenMarket: boolean;
}

function View(props: Props) {
  const { missionsResults, stakingResults, prices, view, chestSalesResults } =
    props;

  return (
    <>
      {view ? (
        <DetailedView
          missionsResults={missionsResults}
          chestSalesResults={chestSalesResults}
          stakingResults={stakingResults}
        />
      ) : (
        <LiteView
          missionsResults={missionsResults}
          chestSalesResults={chestSalesResults}
          stakingResults={stakingResults}
          prices={prices}
        />
      )}
    </>
  );
}

export default View;
