import style from "./TrendingTitleDecoration.module.css";

export const TrendingTitleDecoration = () => {
  return (
    <div className={style.TrendingTitleDecoration}>
      <div className={style.diagonalSquare}></div>
      <div className={style.middleLine}>
        <h1>Trending</h1>
      </div>
      <div className={style.diagonalSquare}></div>
    </div>
  );
};
