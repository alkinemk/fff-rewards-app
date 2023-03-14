import "./ToggleButton.css";

interface Props {
  value: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
}

function ToggleButton(props: Props) {
  const { value, onClick } = props;
  return (
    <div className="flex items-center justify-center w-full mt-4">
      <div className="text-slate-400 font-medium mr-4">Simple view</div>

      <label htmlFor="toggleB" className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            onClick={() => onClick(!value)}
            type="checkbox"
            id="toggleB"
            className="sr-only"
          ></input>
          <div className="block w-14 h-8 rounded-full orange-bg"></div>
          <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
      </label>
      <div className="ml-4 text-slate-400 font-medium">Detailed view</div>
    </div>
  );
}

export default ToggleButton;
