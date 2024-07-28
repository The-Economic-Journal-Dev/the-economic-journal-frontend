import style from "./SubHeader1.module.css"

function getCurrentMonth(): string {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const currentDate = new Date();
  const currentMonth = months[currentDate.getMonth()];

  return currentMonth;
}

function getCurrentYear():number {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear()
  
  return currentYear
}

function SubHeader1() {
    return (
        <div className={style.TopHeaderDiv}>
        <h6 className={style.TopHeaderText1}>The Economic Journal - {getCurrentMonth()} {getCurrentYear()}</h6>
        <h6 className={style.TopHeaderText2}>Finance, economic, business and entrepreneurship blogs</h6>
      </div>
    )
}

export default SubHeader1;