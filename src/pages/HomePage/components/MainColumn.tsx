import style from "./MainColumn.module.css";
import { useState, useEffect } from "react";

interface IArticleData {
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
  articleText?: string;
}

function cropText(input: string): string {
  const maxLength = 256;
  if (input.length > maxLength) {
    return input.slice(0, maxLength) + '...';
  }
  return input;
}

function MainColumn({ article }: { article: IArticleData | null }) {
  const [lastDate, setLastDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (article) {
      const updateLastDate = () => {
        if (new Date(article.lastUpdated).getTime() > (new Date(article.datePublished).getTime() + 20000)) {
          setLastDate("Last Updated: " + new Date(article.lastUpdated).toLocaleDateString());
        } else {
          setLastDate("Date Published: " + new Date(article.datePublished).toLocaleDateString());
        }
      };

      updateLastDate();
      setIsLoading(false);
    }
  }, [article]);

  if (isLoading) {
    return (
      <div className={style.MainColumn}>
        <div className={style.Loader}></div>
      </div>
    );
  }

  if (!article) {
    return <div className={style.MainColumn}>No article available</div>;
  }

  return (
    <div className={style.MainColumn}>
      <img
        src={article.imageUrl}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <div className={style.MainColumnTextWrap}>
        <h5>{lastDate}</h5>
        <h1>{article.title}</h1>
        <h6>
          {article.summary ? article.summary : cropText(article.articleText || '')}
        </h6>
      </div>
    </div>
  );
}

export default MainColumn;
