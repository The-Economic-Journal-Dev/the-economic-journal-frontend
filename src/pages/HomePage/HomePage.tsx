import Body from "../../components/Body/Body.tsx";
import style from "./HomePage.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { TrendingTitleDecoration } from "./components/TrendingTitleDecoration.tsx";
import MainColumn from "./components/MainColumn.tsx"
import { SubColumn, SubColumnWithImage } from "./components/SubColumns.tsx";

// TypeScript interface to define the schema fields for Article
interface IArticleData  {
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

function HomePage() {
  const [apiData, setAPIData] = useState<IArticleData[]>([]);
  const url = "https://api.derpdevstuffs.org/articles?includeText=true";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(url);
        const posts = (await response.json()).articles as IArticleData[];
        console.log(posts[0]);
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
            <MainColumn article={apiData[0]}/>

            <span className={style.ColumnDivider}></span>

            <div className={style.SubColumn}>
              <SubColumnWithImage article={apiData.length > 1 ? apiData[1] : null} />

              <div className={style.ContentSeparator}></div>

              <SubColumn article={apiData.length > 2 ? apiData[2] : null} />

              <div className={style.ContentSeparator}></div>

              <SubColumn article={apiData.length > 3 ? apiData[3] : null} />
            </div>

            <span className={style.ColumnDivider}></span>

            <div className={style.SubColumn}>
              <SubColumn article={apiData.length > 4 ? apiData[4] : null} />

              <div className={style.ContentSeparator}></div>

              <SubColumn article={apiData.length > 5 ? apiData[5] : null} />

              <div className={style.ContentSeparator}></div>

              <SubColumnWithImage article={apiData.length > 6 ? apiData[6] : null} />
            </div>
          </div>
        </div>
      </Body>

      <div className={style.SectionDivider}></div>

      <div className={style.TrendingWrap}>
        <div className={style.TrendingTitleWrap}>
          <TrendingTitleDecoration />
          <h1>Trending</h1>
          <TrendingTitleDecoration />
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
