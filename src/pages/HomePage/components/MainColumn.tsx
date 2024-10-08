import {Link} from "react-router-dom";
import style from "./MainColumn.module.css"
import {useEffect, useState} from "react";

function cropText(input: string): string {
    const maxLength = 256;
    if (input.length > maxLength) {
        return input.slice(0, maxLength) + '...';
    }
    return input;
}

function MainColumn({article}: { article: IArticleData | null }) {
    const [lastDate, setLastDate] = useState<string>("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (article) {
            const updateLastDate = () => {
                if (
                    new Date(article.lastUpdated).getTime() >
                    new Date(article.datePublished).getTime() + 40000
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
                    <div className={style.SkeletonImage}/>
                    <div className={style.SkeletonTextWrap}>
                        <div className={style.SkeletonDate}/>
                        <div className={style.SkeletonTitle}/>
                        <div className={style.SkeletonSummary}/>
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
                        <h2>{article?.title || "No Title"}</h2>
                        <h6>
                            {article
                                ? article.summary
                                : cropText(
                                    article!.articleBody.replace(/(<([^>]+)>)/gi, "") ||
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
