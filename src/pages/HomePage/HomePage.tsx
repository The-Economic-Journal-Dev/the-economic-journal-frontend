import Body from "../../components/Body/Body.tsx";
import style from "./HomePage.module.css";
import {useEffect, useState} from "react";
import {TrendingTitleDecoration} from "./components/TrendingTitleDecoration.tsx";
import MainColumn from "./components/MainColumn.tsx";
import {SubColumnBox} from "./components/SubColumns.tsx";
import {Link} from "react-router-dom";

function TrendingPost({article}: { article: IArticleData | null }) {
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
        <Link to={article?.metaTitle ? `/articles/${article.metaTitle}` : "./"} className={style.TrendingPost}>
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
                    <img src={article?.imageUrl} alt=""
                         loading="lazy" referrerPolicy="no-referrer"/>

                    <div className={style.TrendingTextWrap}>
                        <h5>{lastDate}</h5>
                        <h4>{article?.title}</h4>
                        <h6>
                            {article ? article.summary : (article!.articleBody.replace(/(<([^>]+)>)/gi, "").slice(0, 320) + "..." || "No Body")}
                        </h6>
                    </div>
                </>
            )}
        </Link>
    )
}

function HomePage() {
    const [fetchedArticles, setFetchedArticles] = useState<IArticleData[]>([]);
    const [trendingArticles, setTrendingArticles] = useState<IArticleData[]>([]);
    const url = "https://api.theeconomicjournal.org/articles?includeText=true&includeTrending=true";

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json()

                if (!data.success) throw new Error("Error fetching posts");

                const articles = data.articles as IArticleData[];
                const trending = data.trending as IArticleData[];

                setFetchedArticles(articles);
                setTrendingArticles(trending)
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchPosts().then(() => console.log("Articles fetched"));
    }, []);

    return (
        <div className={style.pageWrap}>
            <Body>
                <div className={style.PostAreaWrap}>
                    <div className={style.PostArea}>
                        <MainColumn article={fetchedArticles[0] || ""}/>

                        <span className={style.ColumnDivider}></span>

                        <div className={style.SubColumn}>
                            <SubColumnBox article={fetchedArticles[1] || ""}/>

                            {/* <div className={style.ContentSeparator}></div> */}

                            <SubColumnBox article={fetchedArticles[2] || ""}/>

                            {/* <div className={style.ContentSeparator}></div> */}

                            <SubColumnBox article={fetchedArticles[3] || ""}/>
                        </div>

                        <span className={style.ColumnDivider}></span>

                        <div className={style.SubColumn}>
                            <SubColumnBox article={fetchedArticles[4] || ""}/>

                            {/* <div className={style.ContentSeparator}></div> */}

                            <SubColumnBox article={fetchedArticles[5] || ""}/>

                            {/* <div className={style.ContentSeparator}></div> */}

                            <SubColumnBox article={fetchedArticles[6] || ""}/>
                        </div>
                    </div>
                </div>
            </Body>

            <div className={style.SectionDivider}></div>

            <div className={style.TrendingWrap}>
                <div className={style.TrendingTitleWrap}>
                    <TrendingTitleDecoration/>
                    <h1>Trending</h1>
                    <TrendingTitleDecoration/>
                </div>

                <div className={style.TrendingContentWrap}>
                    <TrendingPost article={trendingArticles[0] || ""}/>
                    <TrendingPost article={trendingArticles[1] || ""}/>
                    <TrendingPost article={trendingArticles[2] || ""}/>
                </div>
            </div>
        </div>
    );
}

export default HomePage;