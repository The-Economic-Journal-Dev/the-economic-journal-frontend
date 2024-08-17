import { Link } from "react-router-dom";
import style from "./MainColumn.module.css"
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
        if (
          new Date(article.lastUpdated).getTime() >
          new Date(article.datePublished).getTime() + 20000
        ) {
          setLastDate(
            "Last Updated: " +
              new Date(article.lastUpdated).toLocaleDateString()
          );
        } else {
          setLastDate(
            "Date Published: " +
              new Date(article.datePublished).toLocaleDateString()
          );
        }
      };

      updateLastDate();
      setIsLoading(false);
    }
  }, [article]);

  return (
    <Link
      to={article ? `/articles/${article.metaTitle}` : "./"}
      className={style.MainColumn}
    >
      {isLoading ? (
        <div className={style.Skeleton}>
          <div className={style.SkeletonImage} />
          <div className={style.SkeletonTextWrap}>
            <div className={style.SkeletonDate} />
            <div className={style.SkeletonTitle} />
            <div className={style.SkeletonSummary} />
          </div>
        </div>
      ) : (
        <>
          <img
            src={
              article?.imageUrl ||
              "https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
            }
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className={style.MainColumnTextWrap}>
            <h5>{lastDate || "YYYY/MM/DD"}</h5>
            <h1>{article?.title || "No Title"}</h1>
            <h6>
              {article
                ? article.summary
                : cropText(
                    article!.articleText ||
                      "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
                  )}
            </h6>
          </div>
        </>
      )}
    </Link>
  );
}

export default MainColumn;
