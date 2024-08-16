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

function cropText(input: string): string {
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
    // Function to fetch the user's name by UID
    const fetchUserName = async () => {
      try {
        const user = await fetch(`https://api.derpdevstuffs.org/users/${article.authorUid}`);
        setAuthorName((user as any).displayName || "Unknown Author");
      } catch (error) {
        console.error("Error fetching user name:", error);
        setAuthorName("Unknown Author");
      }
    };

    fetchUserName();
  }, [article.authorUid]);

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
            <h2>{article.title}</h2>
            <h6 style={{ fontStyle: "italic", fontWeight: "bold" }}>{authorName}</h6>
            <h6>
              {article.summary? cropText(article.summary): cropText(article.articleText)}
            </h6>
            <div className={style.SubPostActionBar}>
              <button className={style.LikeButton}>
                <img src={thumbsUpLogo} alt="" />{article.likesCount}
              </button>
              <button className={style.CommentButton}>
                <img src={commentLogo} alt="" />X
              </button>
              <h6>{new Date(article.lastUpdated).toISOString().slice(0, 10).replace(/-/g,"/")}</h6>
            </div>
          </>
        )}
      </div>
      {isLoading ? (
        <div className={`${style.skeleton} ${style.skeletonImg}`} />
      ) : (
        <img
          src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      )}
    </div>
  );
}

export default SubBox;
