interface Record {
  reward: string;
  amount: string | number | boolean | null;
}

// const testPrices: Price = {
//   "famous-fox-federation": 0.005,
//   solana: 20,
// };

const toLocaleFixed = (n: number) => {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
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

interface Props {
  isLoading: boolean;
  hasFirstRequestBeenSent: boolean;
  chestResults: Array<Record>;
  stakingResults: string | number | boolean | null | undefined;
  prices: Price;
  view: boolean;
}

function View(props: Props) {
  const { chestResults, stakingResults, prices, view } = props;

  return (
    <>
      {view ? (
        <div className="p-4">
          {/* <div className="py-4 self-center">MISSION REWARDS</div> */}
          <div className="flex rounded-md inner-purple-bg">
            <div className="pt-6 pb-6 flex items-stretch w-full">
              <div className="pl-8 pb-8 flex flex-col flex-1 rounded-lg w-3/5">
                <span className="sm:text-3xl lg:text-5xl pb-4 text-2xl font-face-lolita text-slate-400">
                  DETAILED REWARDS
                </span>
                <table className="text-l sm:text-2xl self-center w-2/3">
                  <thead className="text-slate-400">
                    <tr>
                      <th className="pl-4 py-3 border-b text-left">Reward</th>
                      <th className="pl-4 py-3 border-b text-left">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chestResults
                      ?.slice(0, -1)
                      ?.map((record) => {
                        if (record.reward === "FOXY") {
                          return {
                            reward: record.reward,
                            amount:
                              Number(record.amount) + Number(stakingResults),
                          } as Record;
                        }
                        return record;
                      })
                      .map((record, idx) => (
                        <tr key={idx}>
                          <td className="p-2 pl-4 border-b border-slate-600 text-slate-200">
                            {record?.reward}
                          </td>
                          <td className="p-2 pl-4 border-b border-slate-600 text-slate-200">
                            {Number(record?.amount).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="p-4">
            <div className="flex flex-col text-center rounded-md inner-purple-bg gap-5">
              <div className="flex py-4 text-slate-200 font-medium text-xl font-face-lolita">
                <div className="flex flex-col flex-auto border-r-2">
                  <span className="sm:text-3xl lg:text-5xl">
                    STAKING TO DATE
                  </span>
                  <span className="orange-text text-4xl pt-4 sm:text-6xl lg:text-8xl">
                    {stakingResults?.toLocaleString()}
                  </span>
                  <span className="sm:text-2xl lg:text-4xl"> $FOXY</span>
                </div>
                <div className="flex flex-col flex-auto border-l-2">
                  <span className="sm:text-3xl lg:text-5xl">
                    MISSION REWARDS
                  </span>
                  <div className="flex flex-row justify-evenly gap-4">
                    {chestResults
                      ?.filter(
                        (record) =>
                          record.reward === "FOXY" || record.reward === "SOL"
                      )
                      .map<React.ReactNode>((record) =>
                        record.reward === "FOXY" ? (
                          <div className="flex flex-col pt-4">
                            <span className="orange-text text-4xl sm:text-6xl lg:text-8xl">
                              {Number(record.amount).toLocaleString()}
                            </span>

                            <span className="sm:text-2xl lg:text-4xl">
                              ${record.reward}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-col pt-4">
                            <span className="solana-text text-4xl sm:text-6xl lg:text-8xl">
                              {Number(record.amount).toLocaleString()}
                            </span>

                            <span className="sm:text-2xl lg:text-4xl">
                              ${record.reward}
                            </span>
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-4">
            <div className="py-4 flex flex-col text-center rounded-md inner-purple-bg font-face-lolita green-text text-4xl sm:text-5xl lg:text-6xl">
              <div className="text-slate-200">Today, that is </div>
              <div className="text-6xl sm:text-7xl lg:text-9xl">
                {toLocaleFixed(
                  chestResults
                    ?.filter(
                      (record) =>
                        record.reward === "FOXY" || record.reward === "SOL"
                    )
                    .map(
                      (record) =>
                        prices[matchingNames[record.reward]] *
                        Number(record.amount)
                    )
                    .reduce(
                      (previousValue, currentValue) =>
                        previousValue + currentValue,
                      0
                    ) +
                    Number(stakingResults) * prices["famous-fox-federation"]
                )}
                $
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default View;
