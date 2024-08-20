import style from "./Category.module.css";
import MainBox from "../../components/ArticleBox/MainBox";
import SubBox from "../../components/ArticleBox/SubBox";
import { useEffect, useState } from "react";

function toTitleCase(str: String) {
  return str.replace(
    /\w\S*/g,
    text => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}


// TypeScript interface to define the schema fields for Article
interface IArticleData  {
  authorUid: string;
  title: string;
  metaTitle: string;
  datePublished: Date;
  lastUpdated: Date;
  articleText: string;
  imageUrl?: string;
  summary?: string;
  articleBody: string;
  category: "Finance" | "Economic" | "Business" | "Entrepreneurship";
  likesCount: number;
}

const CategoryPage = ({ category }: { category: String }) => {
  const [ articleData, setArticleData ] = useState<IArticleData[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ error, setError] = useState<string | null>(null);

  useEffect(()=>{
    const fetchArticleDateByCategory = async () => {
      try {
      const response = await fetch(`https://api.theeconomicjournal.org/articles?category=${toTitleCase(category)}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();

      setArticleData(result.articles);
    } catch (error) {
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
    }

    fetchArticleDateByCategory()
  },[])


  return (
    <div>
      <div className={style.PageTitle}>{toTitleCase(category)}</div>
      <MainBox isLoading={loading} article={articleData[0] || {}}/>

      <SubBox isLoading={loading} article={articleData[1] || {}}/>

      <SubBox isLoading={loading} article={articleData[2] || {}}/>

      <SubBox isLoading={loading} article={articleData[3] || {}}/>

      <SubBox isLoading={loading} article={articleData[4] || {}}/>
    </div>
  );
};

export default CategoryPage;
