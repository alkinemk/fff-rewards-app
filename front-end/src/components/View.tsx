import DetailedView from "./DetailedView";
import LiteView from "./LiteView";

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
  missionsResults: Array<Array<number | string>>;
  stakingResults: number;
  chestSalesResults: number;
  prices: Price;
  mode: boolean;
}

function View(props: Props) {
  const {
    missionsResults,
    stakingResults,
    prices,
    mode,
    chestSalesResults,
    hasFirstRequestBeenSent,
  } = props;

  return (
    <>
      {hasFirstRequestBeenSent && (
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
