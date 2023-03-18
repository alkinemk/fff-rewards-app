type Record = {
  amount: string | number | boolean | null;
  reward: string | number | boolean | null;
};

type ChestsSales = {
  total_sol: string | number | boolean | null;
  total_chests: string | number | boolean | null;
};

type Props = {
  missionsResults: Array<Record> | undefined;
  chestSalesResults: ChestsSales | undefined;
  chestBuysResults: ChestsSales | undefined;
  stakingResults: string | number | boolean | null | undefined;
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
  return (
    <div className="flex flex-col flex-auto border-b-2 py-3 sm:border-r-2 sm:border-b-0">
      <span className="text-base sm:text-xl md:text-2xl lg:text-4xl">
        STAKING TO DATE
      </span>
      <span className="orange-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
        {props.stakingResults?.toLocaleString()}
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
        {missionsResults
          ?.filter(
            (record) => record.reward === "FOXY" || record.reward === "SOL"
          )
          .map<React.ReactNode>((record, idx) =>
            record.reward === "FOXY" ? (
              <div key={idx} className="flex flex-col">
                <span className="orange-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
                  {Number(record.amount).toLocaleString()}
                </span>

                <span className="text-base sm:text-xl md:text-xl lg:text-3xl">
                  ${record.reward}
                </span>
              </div>
            ) : (
              <div key={idx} className="flex flex-col">
                <span className="solana-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
                  {toLocaleFixed(Number(record.amount))}
                </span>

                <span className="text-base sm:text-xl md:text-xl lg:text-3xl">
                  ${record.reward}
                </span>
              </div>
            )
          )}
      </div>
    </div>
  );
}

function ChestSales(props: Partial<Props>) {
  const { chestSalesResults, chestBuysResults } = props;
  console.log(chestSalesResults);
  return (
    <div className="flex flex-col flex-auto py-3 border-b-2 last:border-b-0 sm:border-r-2 sm:last:border-r-0 sm:">
      <span className="text-base sm:text-xl md:text-2xl lg:text-4xl">
        CHEST SALES
      </span>
      <span className="solana-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
        {toLocaleFixed(
          Number(chestSalesResults?.total_sol) -
            Number(chestBuysResults?.total_sol)
        )}
      </span>
      <span className="text-base sm:text-xl md:text-xl lg:text-3xl"> $SOL</span>
    </div>
  );
}

function GrandTotal(props: Props) {
  const {
    missionsResults,
    chestSalesResults,
    prices,
    stakingResults,
    chestBuysResults,
  } = props;
  return (
    <div className="px-4">
      <div className="py-4 flex flex-col text-center rounded-md inner-purple-bg font-face-lolita green-text text-4xl sm:text-5xl lg:text-6xl">
        <div className="text-slate-200">Today, that is </div>
        <div className="text-6xl sm:text-7xl lg:text-9xl">
          $
          {toLocaleFixed(
            Number(
              missionsResults
                ?.filter(
                  (record) =>
                    record.reward === "FOXY" || record.reward === "SOL"
                )
                .map((record) => {
                  if (record.reward === "SOL") {
                    return (
                      prices[matchingNames[record.reward]] *
                      (Number(record.amount) +
                        (Number(chestSalesResults?.total_sol) -
                          Number(chestBuysResults?.total_sol) || 0))
                    );
                  }
                  return (
                    prices[matchingNames[String(record.reward)]] *
                    Number(record.amount)
                  );
                })
                .reduce(
                  (previousValue, currentValue) => previousValue + currentValue
                )
            ) +
              Number(stakingResults) * prices[matchingNames["FOXY"]]
          )}
        </div>
      </div>
    </div>
  );
}

function LiteView(props: Props) {
  const {
    missionsResults,
    chestSalesResults,
    stakingResults,
    prices,
    chestBuysResults,
  } = props;
  return (
    <div className="flex flex-col flex-auto">
      <div className="p-4">
        <div className="flex flex-col text-center rounded-md inner-purple-bg gap-5">
          <div className="flex flex-col sm:flex-row sm:py-6 text-slate-200 font-medium text-xl px-2 font-face-lolita justify-evenly">
            <>
              <Staking stakingResults={stakingResults} />
              <Missions missionsResults={missionsResults} />

              {chestSalesResults !== undefined && (
                <ChestSales
                  chestSalesResults={chestSalesResults}
                  chestBuysResults={chestBuysResults}
                />
              )}
            </>
          </div>
        </div>
      </div>
      <GrandTotal
        prices={prices}
        missionsResults={missionsResults}
        chestSalesResults={chestSalesResults}
        chestBuysResults={chestBuysResults}
        stakingResults={stakingResults}
      />
    </div>
  );
}

export default LiteView;
