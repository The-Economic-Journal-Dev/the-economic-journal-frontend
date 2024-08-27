import style from "./SubColumns.module.css";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

/**
 * Crops text to a specified maximum length.
 * @param {string} input - The input text to crop.
 * @returns {string} - The cropped text with ellipsis if necessary.
 */
function cropText(input: string = ""): string {
    const maxLength = 256;
    if (input.length > maxLength) {
        return input.slice(0, maxLength) + "...";
    }
    return input;
}

/**
 * SubColumnWithImage component displays article content with an image or a skeleton loading screen while loading.
 * @param {{ article: IArticleData | null }} props - The component props.
 * @returns {JSX.Element} - The rendered component.
 */
function SubColumnBox({article}: { article: IArticleData | null }): JSX.Element {
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

    return (
        <Link to={article?.metaTitle ? `/articles/${article.metaTitle}` : "./"} className={style.SubColumnTextWrap}>
            {isLoading ? (
                <div className={style.Skeleton}>
                    <div className={style.SkeletonImage}/>
                    <div className={style.SkeletonTextWrap}>
                        <div className={style.SkeletonDate}/>
                        <div className={style.SkeletonTitle}/>
                        <div className={style.SkeletonSummary}/>
                    </div>
                </div>
            ) : (
                <>
                    <div className={style.SubColumnImage}>
                        <img
                            src={article?.imageUrl || "https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"}
                            alt="" loading="lazy" referrerPolicy="no-referrer" className={style.SubColumnImage}/>
                    </div>
                    <div className={style.SubColumnTextWrap}>
                        <h5>{lastDate || "YYYY/MM/DD"}</h5>
                        <h4>{article?.title || "No Title"}</h4>
                        <h6>
                            {article ? article.summary : cropText(article!.articleText || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.')}
                        </h6>
                    </div>
                </>
            )}
        </Link>
    );
}

export {SubColumnBox};
