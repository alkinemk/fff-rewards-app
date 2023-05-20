type Record = {
  amount: string | number | boolean | null;
  reward: string | number | boolean | null;
};

type Props = {
  missionsResults: Array<Array<number | string>>;
  chestSalesResults: number;
  stakingResults: number;
};

const toLocaleFixed = (n: number) => {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

function DetailedView(props: Props) {
  const { missionsResults, chestSalesResults, stakingResults } = props;
  return (
    <div className="p-4">
      {/* <div className="py-4 self-center">MISSION REWARDS</div> */}
      <div className="flex rounded-md inner-purple-bg">
        <div className="pt-6 pb-6 flex items-stretch w-full">
          <div className="pl-8 pb-8 flex flex-col flex-1 rounded-lg w-3/5">
            <span className="sm:text-2xl md:text-3xl lg:text-5xl pb-4 text-2xl font-face-lolita text-slate-400">
              DETAILED REWARDS
            </span>
            <table className="text-l sm:text-xl md:text-2xl self-center w-2/3">
              <thead className="text-slate-400">
                <tr>
                  <th className="pl-4 py-3 border-b text-left">Reward</th>
                  <th className="pl-4 py-3 border-b text-left">Amount</th>
                </tr>
              </thead>
              {/* <tbody>
                {missionsResults
                  ?.map((record) => {
                    if (record.reward === "FOXY") {
                      return {
                        reward: record.reward,
                        amount: Number(record.amount) + Number(stakingResults),
                      } as Record;
                    }
                    return record;
                  })
                  .map((record, idx) => {
                    if (record.reward === "SOL") {
                      return (
                        <tr key={idx}>
                          <td className="p-2 pl-4 border-b border-slate-600 text-slate-200">
                            {record?.reward}
                          </td>
                          <td className="p-2 pl-4 border-b border-slate-600 text-slate-200">
                            {toLocaleFixed(Number(record?.amount))} +{" "}
                            {toLocaleFixed(
                              Number(chestSalesResults?.total_sol) -
                                Number(chestBuysResults?.total_sol) || 0
                            )}
                          </td>
                        </tr>
                      );
                    }
                    return (
                      <tr key={idx}>
                        <td className="p-2 pl-4 border-b border-slate-600 text-slate-200">
                          {record?.reward}
                        </td>
                        <td className="p-2 pl-4 border-b border-slate-600 text-slate-200">
                          {Number(record?.amount).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
              </tbody> */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailedView;
