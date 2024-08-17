import style from "./OptionSelector.module.css";

const OptionSelector = ({ options, optionPressed, optionChose }: any) => {
  return (
    <nav className={style.optionSelector}>
      {options.map((option: string) => (
        <button
        key={option}
          onClick={() => optionPressed(option)}
          style={{
            fontWeight: optionChose == option ? "bolder" : "normal",
          }}
        >
          {option}
        </button>
      ))}
    </nav>
  );
};

export default OptionSelector;
