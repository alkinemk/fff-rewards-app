type Props = {
  missionsResults: Array<Array<number | string>>;
  chestSalesResults: number;
  stakingResults: number;
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
        {Number(stakingResults).toLocaleString()}
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
            {record[1] === "SOL" ? (
              <span className="solana-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
                {Number(record[0]).toLocaleString()}
              </span>
            ) : (
              <span className="orange-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
                {Number(record[0]).toLocaleString()}
              </span>
            )}
            <span className="text-base sm:text-xl md:text-xl lg:text-3xl">
              ${record[1]}
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
        {toLocaleFixed(Number(chestSalesResults))}
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
                    if (record[1] === "SOL") {
                      return (
                        prices[matchingNames[record[1]]] * Number(record[0])
                      );
                    }
                    return prices[matchingNames[record[1]]] * Number(record[0]);
                  })
                  .reduce(
                    (previousValue, currentValue) =>
                      previousValue + currentValue
                  )
              ) +
                Number(stakingResults) * prices[matchingNames["FOXY"]] +
                Number(chestSalesResults) * prices[matchingNames["SOL"]]
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

// type Props = {
//   missionsResults: Array<Array<number | string>>;
//   chestSalesResults: number;
//   stakingResults: number;
//   prices: Price;
// };

// const matchingNames: Matching = {
//   FOXY: "famous-fox-federation",
//   SOL: "solana",
// };

// type Matching = {
//   [key: string]: string;
// };

// type Price = {
//   [key: string]: number;
// };

// const toLocaleFixed = (n: number) => {
//   return n.toLocaleString(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
//   });
// };

// function Staking(props: Partial<Props>) {
//   const { stakingResults } = props;
//   return (
//     <div className="flex flex-col flex-auto border-b-2 py-3 sm:border-r-2 sm:border-b-0">
//       <span className="text-base sm:text-xl md:text-2xl lg:text-4xl">
//         STAKING TO DATE
//       </span>
//       <span className="orange-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
//         {Number(stakingResults).toLocaleString()}
//       </span>
//       <span className="text-base sm:text-xl md:text-xl lg:text-3xl">
//         {" "}
//         $FOXY
//       </span>
//     </div>
//   );
// }

// function Missions(props: Partial<Props>) {
//   const { missionsResults } = props;
//   return (
//     <div className="flex flex-col flex-auto border-b-2 last:border-b-0 py-3 sm:border-r-2 sm:border-b-0">
//       <span className="text-base sm:text-xl md:text-2xl lg:text-4xl">
//         MISSION REWARDS
//       </span>
//       <div className="flex flex-row justify-evenly gap-4">
//         <div className="flex flex-col">
//           <span className="orange-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
//             {Number(missionsResults).toLocaleString()}
//           </span>

//           <span className="text-base sm:text-xl md:text-xl lg:text-3xl">
//                   ${record.reward}
//                 </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ChestSales(props: Partial<Props>) {
//   const { chestSalesResults } = props;
//   return (
//     <div className="flex flex-col flex-auto py-3 border-b-2 last:border-b-0 sm:border-r-2 sm:last:border-r-0 sm:">
//       <span className="text-base sm:text-xl md:text-2xl lg:text-4xl">
//         CHEST AND ITEMS SALES
//       </span>
//       <span className="solana-text text-3xl sm:text-3xl pt-3 md:text-4xl lg:text-7xl">
//         {toLocaleFixed(Number(chestSalesResults))}
//       </span>
//       <span className="text-base sm:text-xl md:text-xl lg:text-3xl"> $SOL</span>
//     </div>
//   );
// }

// function GrandTotal(props: Props) {
//   const { missionsResults, chestSalesResults, prices, stakingResults } = props;
//   return (
//     <div className="px-4">
//       <div className="py-4 flex flex-col text-center rounded-md inner-purple-bg font-face-lolita green-text text-4xl sm:text-5xl lg:text-6xl">
//         <div className="text-slate-200">Today, that is </div>
//         {/* <div className="text-6xl sm:text-7xl lg:text-9xl">
//           $
//           {toLocaleFixed(
//             Number(
//               missionsResults
//                 ?.filter(
//                   (record) =>
//                     record.reward === "FOXY" || record.reward === "SOL"
//                 )
//                 .map((record) => {
//                   if (record.reward === "SOL") {
//                     return (
//                       prices[matchingNames[record.reward]] *
//                       (Number(record.amount) +
//                         (Number(chestSalesResults?.total_sol) -
//                           Number(chestBuysResults?.total_sol) || 0))
//                     );
//                   }
//                   return (
//                     prices[matchingNames[String(record.reward)]] *
//                     Number(record.amount)
//                   );
//                 })
//                 .reduce(
//                   (previousValue, currentValue) => previousValue + currentValue
//                 )
//             ) +
//               Number(stakingResults) * prices[matchingNames["FOXY"]]
//           )}
//         </div> */}
//       </div>
//     </div>
//   );
// }

// function LiteView(props: Props) {
//   const { missionsResults, chestSalesResults, stakingResults, prices } = props;
//   return (
//     <div className="flex flex-col flex-auto">
//       <div className="p-4">
//         <div className="flex flex-col text-center rounded-md inner-purple-bg">
//           <div className="flex flex-col sm:flex-row px-14 sm:px-2 sm:py-6 text-slate-200 font-medium text-xl font-face-lolita justify-evenly">
//             <>
//               <Staking stakingResults={stakingResults} />
//               <Missions missionsResults={missionsResults} />

//               {chestSalesResults !== undefined && (
//                 <ChestSales chestSalesResults={chestSalesResults} />
//               )}
//             </>
//           </div>
//         </div>
//       </div>
//       <GrandTotal
//         prices={prices}
//         missionsResults={missionsResults}
//         chestSalesResults={chestSalesResults}
//         stakingResults={stakingResults}
//       />
//     </div>
//   );
// }

// export default LiteView;
