interface Record {
  reward: string;
  amount: string | number | boolean | null;
}

// const testPrices: Price = {
//   "famous-fox-federation": 0.005,
//   solana: 20,
// };

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
  chestResults: Array<Record> | undefined;
  stakingResults: string | number | boolean | null | undefined;
  prices: Price;
  view: boolean;
}

function View(props: Props) {
  const { chestResults, stakingResults, prices, view } = props;

  //const;
  return (
    <>
      {view ? (
        <div className="p-4 flex flex-col gap-4">
          {/* <div className="py-4 self-center">MISSION REWARDS</div> */}
          <div className=" bg-slate-700 rounded-md w-screen ">
            <div className="pt-4 pb-8">
              <div className="pl-4 text-2xl text-slate-400">MISSIONS</div>
              <table className="table-auto w-full text-l">
                <thead className="text-slate-400">
                  <tr>
                    <th className="pl-4 py-3 border-b text-left">Reward</th>
                    <th className="pl-4 py-3 border-b text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {chestResults?.slice(0, -1)?.map((record, idx) => (
                    <tr key={idx} className="">
                      <td className="p-2 pl-4 border-b border-slate-600 text-slate-200">
                        {record.reward}
                      </td>
                      <td className="p-2 pl-4 border-b border-slate-600 text-slate-200">
                        {record.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-4">
          <div className="bg-slate-700 text-center rounded-md">
            <div className="py-8 text-slate-200 font-medium text-xl">
              <div>You've earned {stakingResults} $FOXY from staking</div>
              <div className="inline">
                You've earned{" "}
                {chestResults
                  ?.filter(
                    (record) =>
                      record.reward === "FOXY" || record.reward === "SOL"
                  )
                  .map<React.ReactNode>((record) => (
                    <span>
                      {/* {Number(record.amount) * Number(prices?[record.reward])} */}
                      {record.amount} ${record.reward}
                    </span>
                  ))
                  .reduce((prev, curr) => [prev, " and ", curr])}{" "}
                from missions
                <div>
                  Today's value is{" "}
                  {chestResults
                    ?.filter(
                      (record) =>
                        record.reward === "FOXY" || record.reward === "SOL"
                    )
                    .map(
                      (record) =>
                        prices[matchingNames[record.reward]] *
                        Number(record.amount)
                    )
                    .reduce((previousValue, currentValue) => {
                      return previousValue + currentValue;
                    })
                    .toFixed(2)}
                  $
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default View;
