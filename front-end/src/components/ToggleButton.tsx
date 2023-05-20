import "./ToggleButton.css";

interface Props {
  mode: boolean;
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
  textLeft: string;
  textRight: string;
  id: string;
}

function ToggleButton(props: Props) {
  const { mode, onClick, textLeft, textRight, id } = props;
  return (
    <div className="flex items-center justify-center w-full mt-4 mb-3">
      <div className="text-slate-400 font-medium mr-2">{textLeft}</div>

      <label htmlFor={id} className="flex items-center cursor-pointer">
        <div className="relative">
          <input
            onClick={() => onClick(!mode)}
            type="checkbox"
            id={id}
            className="sr-only"
          ></input>
          <div className="dot-2 block w-14 h-8 rounded-full orange-bg-2"></div>
          <div className="dot-1 absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
        </div>
      </label>
      <div className="ml-2 text-slate-400 font-medium">{textRight}</div>
    </div>
  );
}

export default ToggleButton;
