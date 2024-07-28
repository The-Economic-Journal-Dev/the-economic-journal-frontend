import style from "./Navbar.module.css";
style;

const Navbar = ({ options, optionPressed, optionChose }: any) => {
  return (
    <nav className={style.sidebar}>
      {options.map((option: string) => (
        <button
          onClick={() => optionPressed(option)}
          style={{
            fontWeight: optionChose == option ? "bolder" : "normal",
            textDecoration: optionChose == option ? "underline" : "none",
          }}
        >
          {option}
        </button>
      ))}
    </nav>
  );
};

export default Navbar;
