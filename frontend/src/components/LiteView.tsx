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

type Props = {
  missionsResults: Array<MissionReward>;
  stakingResults: Array<StakingResult>;
  chestSalesResults: Array<ChestSalesResult>;
  prices: Price;
};

const matchingNames: Matching = {
  FOXY: "famous-fox-federation",
  SOL: "solana",
};

type Matching = {
  [key: string]: string;
};

type Price = {
  [key: string]: number;
};

const toLocaleFixed = (n: number) => {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

function Staking(props: Partial<Props>) {
  const { stakingResults } = props;
  return (
    <div className="flex flex-col flex-auto border-b-2 py-3 sm:border-r-2 sm:border-b-0">
      <span className="text-base sm:text-xl md:text-2xl lg:text-4xl">
        STAKING REWARDS
      </span>
      <span className="orange-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
        {Number(stakingResults?.[0]?.amount)}
      </span>
      <span className="text-base sm:text-xl md:text-xl lg:text-3xl">
        {" "}
        $FOXY
      </span>
    </div>
  );
}

function Missions(props: Partial<Props>) {
  const { missionsResults } = props;
  return (
    <div className="flex flex-col flex-auto border-b-2 last:border-b-0 py-3 sm:border-r-2 sm:border-b-0">
      <span className="text-base sm:text-xl md:text-2xl lg:text-4xl">
        MISSION REWARDS
      </span>
      <div className="flex flex-row justify-evenly gap-4">
        {missionsResults?.map<React.ReactNode>((record, idx) => (
          <div key={idx} className="flex flex-col">
            {record.reward === "SOL" ? (
              <span className="solana-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
                {Number(record.amount).toLocaleString()}
              </span>
            ) : (
              <span className="orange-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
                {Number(record.amount).toLocaleString()}
              </span>
            )}
            <span className="text-base sm:text-xl md:text-xl lg:text-3xl">
              ${record.reward}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChestSales(props: Partial<Props>) {
  const { chestSalesResults } = props;
  return (
    <div className="flex flex-col flex-auto py-3 border-b-2 last:border-b-0 sm:border-r-2 sm:last:border-r-0 sm:">
      <span className="text-base sm:text-xl md:text-2xl lg:text-4xl">
        CHEST AND ITEMS SALES
      </span>
      <span className="solana-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
        {toLocaleFixed(Number(chestSalesResults?.[0]?.amount_difference))}
      </span>
      <span className="text-base sm:text-xl md:text-xl lg:text-3xl"> $SOL</span>
    </div>
  );
}

function GrandTotal(props: Props) {
  const { missionsResults, chestSalesResults, prices, stakingResults } = props;
  if (missionsResults.length > 0)
    return (
      <div className="px-4">
        <div className="py-4 flex flex-col text-center rounded-md inner-purple-bg font-face-lolita green-text text-4xl sm:text-5xl lg:text-6xl">
          <div className="text-slate-200">Today, that is </div>
          <div className="text-6xl sm:text-7xl lg:text-9xl">
            $
            {toLocaleFixed(
              Number(
                missionsResults
                  .map((record) => {
                    if (record.reward === "SOL") {
                      return (
                        prices[matchingNames[record.reward]] *
                        Number(record.amount)
                      );
                    }
                    return (
                      prices[matchingNames[record.reward]] *
                      Number(record.amount)
                    );
                  })
                  .reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue
                  )
              ) +
                Number(stakingResults?.[0]?.amount) *
                  prices[matchingNames["FOXY"]] +
                Number(chestSalesResults?.[0]?.amount_difference) *
                  prices[matchingNames["SOL"]]
            )}
          </div>
        </div>
      </div>
    );
  return <></>;
}

function LiteView(props: Props) {
  const { missionsResults, chestSalesResults, stakingResults, prices } = props;
  return (
    <div className="flex flex-col flex-auto">
      <div className="p-4">
        <div className="flex flex-col text-center rounded-md inner-purple-bg">
          <div className="flex flex-col sm:flex-row px-14 sm:px-2 sm:py-6 text-slate-200 font-medium text-xl font-face-lolita justify-evenly">
            <>
              <Staking stakingResults={stakingResults} />
              <Missions missionsResults={missionsResults} />

              {chestSalesResults !== undefined && (
                <ChestSales chestSalesResults={chestSalesResults} />
              )}
            </>
          </div>
        </div>
      </div>
      <GrandTotal
        prices={prices}
        missionsResults={missionsResults}
        chestSalesResults={chestSalesResults}
        stakingResults={stakingResults}
      />
    </div>
  );
}

export default LiteView;
