import style from "./Category.module.css";
import MainBox from "../../components/ArticleBox/MainBox";
import SubBox from "../../components/ArticleBox/SubBox";

function toTitleCase(str: String) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

const CategoryPage = ({ title }: { title: String }) => {
  return (
    <div>
      <div className={style.PageTitle}>{toTitleCase(title)}</div>
      <MainBox />

      <SubBox />

      <SubBox />

      <SubBox />

      <SubBox />
    </div>
  );
};

export default CategoryPage;
