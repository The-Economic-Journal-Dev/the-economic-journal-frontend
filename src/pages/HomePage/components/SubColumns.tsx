import style from "./SubColumns.module.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function cropText(input: string = ""): string {
  const maxLength = 256;
  if (input.length > maxLength) {
    return input.slice(0, maxLength) + '...';
  }
  return input;
}

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

function SubColumnWithImage({ article }: { article: IArticleData | null }) {
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
      <div className={style.SubColumnTextWrap}>
        <div className={style.Loader}></div>
      </div>
    );
  }

  if (!article) {
    return <div className={style.SubColumnTextWrap}>No article available</div>;
  }

  return (
    <Link to={article.metaTitle ? `/articles/${article.metaTitle}` : "./"}>
      <div className={style.SubColumnImage}>
        <img src={article.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" />
      </div>
      <div className={style.SubColumnTextWrap}>
        <h5>{lastDate}</h5>
        <h4>{article.title}</h4>
        <h6>
          {article.summary ? article.summary : cropText(article.articleText || '')}
        </h6>
      </div>
    </Link>
  );
}

function SubColumn({ article }: { article: IArticleData | null }) {
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
      <div className={style.SubColumnTextWrap}>
        <div className={style.Loader}></div>
      </div>
    );
  }

  if (!article) {
    return <div className={style.SubColumnTextWrap}>No article available</div>;
  }

  return (
    <Link to={article.metaTitle ? `/articles/${article.metaTitle}` : "./"} className={style.SubColumnTextWrap}>
      <h5>{lastDate}</h5>
      <h4>{article.title}</h4>
      <h6>
        {article.summary ? article.summary : cropText(article.articleText || '')}
      </h6>
    </Link>
  );
}

export { SubColumnWithImage, SubColumn };
