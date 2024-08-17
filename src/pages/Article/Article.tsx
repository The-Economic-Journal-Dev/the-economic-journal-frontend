import style from "./Article.module.css";
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Interweave } from "interweave";
import { auth } from "../../firebase";

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
  const [authorName, setAuthorName] = useState<string>("");
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);

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
      setLikes(result.article.likesCount);
      fetchUserName(result.article);
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

  const fetchUserName = async (article: IArticleData) => {
        try {
          const response = await fetch(`https://api.derpdevstuffs.org/users/${article.authorUid}`);
          const user = await response.json();
          setAuthorName(user.displayName || "Unknown Author");
        } catch (error) {
          console.error("Error fetching user name:", error);
          setAuthorName("Unknown Author");
        }
    };

  fetchArticleData();
}, [metaTitle]);

  const handleLikeUnlike = async () => {
    try {
      const method = isLiked ? 'DELETE' : 'POST';
      const response = await fetch(`https://api.derpdevstuffs.org/articles/${articleData.metaTitle}/like`, {
        method: method
      });

      if (!response.ok) {
        throw new Error(`Failed to ${isLiked ? 'unlike' : 'like'} the article`);
      }

      const updatedArticle = await response.json();
      setLikes(updatedArticle.likesCount);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(`Error ${isLiked ? 'unliking' : 'liking'} the article:`, error);
      // Optionally, you can set an error state or show a notification to the user
    }
  };

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
          <p className={style.Name}></p>
        </div>
        <h1 className={style.Title}>{articleData.title}</h1>
        <div className={style.ImageContainer}>
          <img
            src={articleData.imageUrl}
            alt="" // Use article title for alt text
            className={style.MainImage}
            loading="lazy" // Lazy load images for better performance
             referrerPolicy="no-referrer"
          />
          <p className={style.ImageSource}>{articleData.imageUrl? "image source": ""}</p>
        </div>

        <div className={style.TextWithSidebar}>
          <div className={style.MainText}>
            <div className={style.ArticleInfo}>
              <p>{lastDate}</p>
              <h1>{articleData.title}</h1>
              <strong>by -{authorName}-</strong>
              <button 
                onClick={handleLikeUnlike} 
                className={`${style.LikeButton} ${isLiked ? style.Liked : ''}`}
              >
                {isLiked ? 'Unlike' : 'Like'} ({likes})
              </button>
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
