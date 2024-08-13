import style from "./Article.module.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Interweave } from "interweave";

// TypeScript interface to define the schema fields for Article
interface IArticleData  {
  authorUid: string;
  title: string;
  metaTitle: string;
  datePublished: Date;
  lastUpdated: Date;
  imageUrl?: string;
  summary?: string;
  articleBody: string;
  category: "Finance" | "Economic" | "Business" | "Entrepreneurship";
  likesCount: number;
}

const ArticlePage = () => {
  const { metaTitle } = useParams<{ metaTitle: string }>();
  const [articleData, setArticleData] = useState<any>(null); // Adjust type as needed
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDate, setLastDate] = useState<string>("");

  useEffect(() => {
  // Fetch the article data from the API
  const fetchArticleData = async () => {
    try {
      const response = await fetch(`https://api.derpdevstuffs.org/articles/${metaTitle}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setArticleData(result.article);
      updateLastDate(result.article);
    } catch (error) {
      setError('Failed to load article');
    } finally {
      setLoading(false);
    }
  };

  const updateLastDate = (articleData: IArticleData) => {
    if (articleData.lastUpdated > articleData.datePublished) {
      setLastDate("Last Updated: " + new Date(articleData.lastUpdated).toLocaleDateString());
    } else {
      setLastDate("Date Published: " + new Date(articleData.datePublished).toLocaleDateString());
    }
  };

  fetchArticleData();
}, [metaTitle]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div className={style.MainContentWrap}>
        <div className={style.MetaData}>
          <p className={style.Section}>{articleData.category} Section</p>
          <p className={style.Name}>- NAME -</p>
        </div>
        <h1 className={style.Title}>{articleData.title}</h1>
        <div className={style.ImageContainer}>
          <img
            src={articleData.imageUrl}
            alt={articleData.title} // Use article title for alt text
            className={style.MainImage}
            loading="lazy" // Lazy load images for better performance
             referrerPolicy="no-referrer"
          />
          <p className={style.ImageSource}>image source</p>
        </div>

        <div className={style.TextWithSidebar}>
          <div className={style.MainText}>
            <div className={style.ArticleInfo}>
              <p>{lastDate}</p>
              <h1>{articleData.title}</h1>
              <strong>by -AUTHOR-</strong>
            </div>
            <p className={style.ArticleContent}>
              <Interweave content={articleData.articleBody} />
            </p>
          </div>

          <aside className={style.SideBar}>
            <h3>Read more articles here</h3>
            <div className={style.SideBarArticle}>
              <img
                src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
                alt="Sidebar Article"
              />
              <p>Lorem ipsum dolor sit amet, consectetur</p>
            </div>
            {/* Add more articles similarly */}
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
