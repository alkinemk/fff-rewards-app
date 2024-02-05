import LiteView from "./LiteView";

// const testPrices: Price = {
//   "famous-fox-federation": 0.005,
//   solana: 20,
// };

type Price = {
  [key: string]: number;
};

type LendingResult = {
  amount: string;
};

type MissionReward = {
  amount: number;
  reward: string;
};

type StakingResult = {
  amount: string;
};

type ChestSalesResult = {
  amount_difference: number;
};

interface Props {
  isLoading: boolean;
  hasFirstRequestBeenSent: boolean;
  missionsResults: Array<MissionReward>;
  stakingResults: Array<StakingResult>;
  lendingResults: Array<LendingResult>;
  chestSalesResults: Array<ChestSalesResult>;
  prices: Price;
  mode: boolean;
}

function View(props: Props) {
  const {
    missionsResults,
    stakingResults,
    prices,
    chestSalesResults,
    lendingResults,
    hasFirstRequestBeenSent,
  } = props;

  console.log(lendingResults);

  return (
    <>
      {hasFirstRequestBeenSent && (
        <LiteView
          missionsResults={missionsResults}
          chestSalesResults={chestSalesResults}
          stakingResults={stakingResults}
          lendingResults={lendingResults}
          prices={prices}
        />
      )}
    </>
  );
}

export default View;
