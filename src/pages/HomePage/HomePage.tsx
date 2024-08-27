import Body from "../../components/Body/Body.tsx";
import style from "./HomePage.module.css";
import {useEffect, useState} from "react";
import {TrendingTitleDecoration} from "./components/TrendingTitleDecoration.tsx";
import MainColumn from "./components/MainColumn.tsx";
import {SubColumnBox} from "./components/SubColumns.tsx";

function HomePage() {
    const [apiData, setAPIData] = useState<IArticleData[]>([]);
    const url = "https://api.theeconomicjournal.org/articles?includeText=true";

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
    }, []);

    return (
        <div className={style.pageWrap}>
            <Body>
                <div className={style.PostAreaWrap}>
                    <div className={style.PostArea}>
                        <MainColumn article={apiData[0] || ""}/>

                        <span className={style.ColumnDivider}></span>

                        <div className={style.SubColumn}>
                            <SubColumnBox article={apiData[1] || ""}/>

                            {/* <div className={style.ContentSeparator}></div> */}

                            <SubColumnBox article={apiData[2] || ""}/>

                            {/* <div className={style.ContentSeparator}></div> */}

                            <SubColumnBox article={apiData[3] || ""}/>
                        </div>

                        <span className={style.ColumnDivider}></span>

                        <div className={style.SubColumn}>
                            <SubColumnBox article={apiData[4] || ""}/>

                            {/* <div className={style.ContentSeparator}></div> */}

                            <SubColumnBox article={apiData[5] || ""}/>

                            {/* <div className={style.ContentSeparator}></div> */}

                            <SubColumnBox article={apiData[6] || ""}/>
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
                    <div className={style.TrendingPost}>
                        <img
                            src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
                            alt=""
                        />

                        <div className={style.TrendingTextWrap}>
                            <h5>f/e/b/e/i/p</h5>
                            <h4>Lorem ipsum dolor sit amet, consectetur</h4>
                            <h6>
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                                malesuada.
                            </h6>
                        </div>
                    </div>

                    <div className={style.TrendingPost}>
                        <img
                            src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
                            alt=""
                        />

                        <div className={style.TrendingTextWrap}>
                            <h5>f/e/b/e/i/p</h5>
                            <h4>Lorem ipsum dolor sit amet, consectetur</h4>
                            <h6>
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                                malesuada.
                            </h6>
                        </div>
                    </div>

                    <div className={style.TrendingPost}>
                        <img
                            src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
                            alt=""
                        />

                        <div className={style.TrendingTextWrap}>
                            <h5>f/e/b/e/i/p</h5>
                            <h4>Lorem ipsum dolor sit amet, consectetur</h4>
                            <h6>
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                                malesuada.
                            </h6>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className={style.SectionDivider}></div> */}
        </div>
    );
}

export default HomePage;