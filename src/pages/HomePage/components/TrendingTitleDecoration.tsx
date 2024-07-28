import style from "./TrendingTitleDecoration.module.css";

export const TrendingTitleDecoration = () => {
  return (
    <div className={style.TrendingTitleDecoration}>
      <div className={style.diagonalSquare}></div>
      <div className={style.middleLine}></div>
      <div className={style.diagonalSquare}></div>
    </div>
  );
};
