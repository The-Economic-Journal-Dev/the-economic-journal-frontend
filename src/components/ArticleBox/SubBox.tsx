import React, { useEffect, useState } from "react";
import style from "./SubBox.module.css";
import thumbsUpLogo from "../../../public/thumbs_up.png";
import commentLogo from "../../../public/comment.png";
import { auth } from "../../firebase";

type SubBoxProps = {
  isLoading: boolean;
  article: IArticleData;
};


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

function cropText(input: string) {
    if (!input ) return undefined;

  const maxLength = 256;
  if (input.length > maxLength) {
    return input.slice(0, maxLength) + '...';
  }
  return input;
}

/**
 * SubBox component renders a post preview with an optional loading state.
 * 
 * @param {SubBoxProps} props - The properties object.
 * @param {boolean} props.isLoading - Indicates whether to show loading skeletons or actual content.
 * @returns {JSX.Element} The SubBox component.
 */
function SubBox({ isLoading, article }: SubBoxProps) {
   const [authorName, setAuthorName] = useState<string>("");

  useEffect(() => {
    if (article?.authorUid) {
      const fetchUserName = async () => {
        try {
          const response = await fetch(`https://api.derpdevstuffs.org/users/${article.authorUid}`);
          const user = await response.json();
          setAuthorName(user.displayName || "Unknown Author");
        } catch (error) {
          console.error("Error fetching user name:", error);
          setAuthorName("Unknown Author");
        }
      };

      fetchUserName();
    }
  }, [article?.authorUid]);

  return (
    <div className={style.SubPostWrap}>
      <div className={style.SubPostContent}>
        {isLoading ? (
          <>
            <div className={`${style.skeleton} ${style.skeletonH2}`} />
            <div className={`${style.skeleton} ${style.skeletonAuthor}`} />
            <div className={`${style.skeleton} ${style.skeletonH6}`} />
            <div className={`${style.skeleton} ${style.skeletonH6}`} />
            <div className={style.skeletonActionBar}>
              <div className={`${style.skeleton} ${style.skeletonButton}`} />
              <div className={`${style.skeleton} ${style.skeletonButton}`} />
              <div className={`${style.skeleton} ${style.skeletonDate}`} />
            </div>
          </>
        ) : (
          <>
            <h2>{article.title || "No Title"}</h2>
            <h6 style={{ fontStyle: "italic", fontWeight: "bold" }}>{authorName || "Unknown Author"}</h6>
            <h6>
              {(article.summary? cropText(article.summary): cropText(article.articleText)) || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere egestas dui fermentum lobortis. Donec id consectetur odio, non consectetur lorem. Etiam nec ante sodales arcu vestibulum blandit. Suspendisse leo diam, cursus eu leo a, imperdiet congue ipsum. Quisque fermentum felis mauris, semper lacinia ipsum fringilla pellentesque. Aliquam lacinia fermentum dui rutrum semper. Maecenas id nulla sapien."}
            </h6>
            <div className={style.SubPostActionBar}>
              <button className={style.LikeButton}>
                <img src={thumbsUpLogo} alt="" />{article.likesCount || 0}
              </button>
              <button className={style.CommentButton}>
                <img src={commentLogo} alt="" />X
              </button>
              <h6>{article.datePublished? new Date(article.lastUpdated).toISOString().slice(0, 10).replace(/-/g,"/"): "YYYY/MM/DD"}</h6>
            </div>
          </>
        )}
      </div>
      {isLoading ? (
        <div className={`${style.skeleton} ${style.skeletonImg}`} />
      ) : (
        <img
          src={article.imageUrl || "https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}

export default SubBox;
