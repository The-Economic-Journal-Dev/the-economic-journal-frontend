import style from "./Article.module.css";
import React, { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router-dom";
import { Interweave } from "interweave";
import { auth } from "../../firebase";
import { User } from "firebase/auth";


// TypeScript interface to define the schema fields for Article
interface IArticleData {
  authorUid: string;
  title: string;
  metaTitle: string;
  datePublished: Date;
  lastUpdated: Date;
  imageUrl?: string;
  summary?: string;
  articleBody: string;
  category: "Finance" | "Economic" | "Business" | "Entrepreneur";
  likesCount: number;
}

const SideColumn = ({category}: { category: string}) => {
  const [apiData, setAPIData] = useState<IArticleData[]>([]);
  const url = `https://api.theeconomicjournal.org/articles?includeText=true&category=${category}`;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(url);  
        const posts = (await response.json()).articles as IArticleData[];
        setAPIData(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [url]);

  return (
    <aside className={style.SideBar}>
      <h3>Read more articles here</h3>
      {apiData.length > 0 ? (
        <div className={style.SideBarArticle}>
          <img
            src={apiData[0].imageUrl || ""}
            alt="Sidebar Article"
          />
          <p>{apiData[0].summary || ""}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* Add more articles similarly */}
    </aside>
    )
}

const LikeButton = ({ currentUser, metaTitle }: { currentUser: User | null, metaTitle: string }) => {
  const [likes, setLikes] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleLikeUnlike = async () => {
    if (!metaTitle){
      return (<button
      onClick={handleLikeUnlike}
      className={style.LikeButton}
    >
      {"Like"} 0
    </button>)
    }

    if (currentUser) {
      navigate("/signin")
    }

    try {
      const method = isLiked ? "DELETE" : "POST";
      const response = await fetch(
        `https://localhost:3000/articles/${metaTitle}/like`,
        {
          method: method,
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to ${isLiked ? "unlike" : "like"} the article`);
      }

      const updatedArticle = await response.json();
      setLikes(updatedArticle.likesCount);
      setIsLiked(!isLiked);
    } catch (error) {
      console.error(
        `Error ${isLiked ? "unliking" : "liking"} the article:`,
        error
      );
      // Optionally, you can set an error state or show a notification to the user
    }
  };

  return (
    <button
      onClick={handleLikeUnlike}
      className={`${style.LikeButton} ${isLiked ? style.Liked : ""}`}
    >
      {isLiked ? "Unlike" : "Like"} {likes}
    </button>
  )
}

const ArticlePage = () => {
  const { metaTitle } = useParams<{ metaTitle: string }>();
  const [articleData, setArticleData] = useState<any>(null); // Adjust type as needed
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDate, setLastDate] = useState<string>("");
  const [authorName, setAuthorName] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    // Clean up the subscription on unmount
    return () => unsubscribe();
  }, []);


  useEffect(() => {
    // Fetch the article data from the API
    const fetchArticleData = async () => {
      try {
        const response = await fetch(
          `https://locahost:3000/articles/${metaTitle}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setArticleData(result.article);
        fetchUserName(result.article);
        updateLastDate(result.article);
      } catch (error) {
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    const updateLastDate = (articleData: IArticleData) => {
      if (articleData.lastUpdated > articleData.datePublished) {
        setLastDate(
          "Last Updated: " +
            new Date(articleData.lastUpdated).toLocaleDateString()
        );
      } else {
        setLastDate(
          "Date Published: " +
            new Date(articleData.datePublished).toLocaleDateString()
        );
      }
    };

    const fetchUserName = async (article: IArticleData) => {
      try {
        const response = await fetch(
          `https://api.theeconomicjournal.org/users/${article.authorUid}`
        );
        const user = await response.json();
        setAuthorName(user.displayName || "Unknown Author");
      } catch (error) {
        console.error("Error fetching user name:", error);
        setAuthorName("Unknown Author");
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
          <p className={style.ImageSource}>
            {articleData.imageUrl ? "image source" : ""}
          </p>
        </div>

        <div className={style.TextWithSidebar}>
          <div className={style.MainText}>
            <div className={style.ArticleInfo}>
              <p>{lastDate}</p>
              <h1>{articleData.title}</h1>
              <strong>by -{authorName}-</strong>
              <LikeButton currentUser={currentUser} metaTitle={metaTitle!}/>
            </div>
            <p className={style.ArticleContent}>
              <Interweave content={articleData.articleBody} />
            </p>
          </div>

          <SideColumn category={articleData.category}/>
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
