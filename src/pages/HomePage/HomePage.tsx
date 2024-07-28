import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import Body from "../../components/Body/Body.tsx";
import style from "./HomePage.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { TrendingTitleDecoration } from "./components/TrendingTitleDecoration.tsx";

interface apiDataType {
  title: string;
  summary: string;
  metaTitle: string;
  articleBody: string;
  position: string;
  category: string;
  image: string;
}

function HomePage() {
  //GET method to fetch posts from API
  const [apiData, setAPIData] = useState<apiDataType[]>([]);
  const url = "";
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(url);
      const posts = (await response.json()) as apiDataType[];
      setAPIData(posts)
    }

    fetchPosts();
  });



  return (
    <div className={style.pageWrap}>
      <Header />
      <Body>
        <div className={style.PostAreaWrap}>
          <div className={style.PostArea}>
            <div className={style.MainColumn}>
              <img
                src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
                alt=""
              />
              <div className={style.MainColumnTextWrap}>
                <h5>f/e/b/e/i/p</h5>
                <h1>Lorem ipsum dolor sit amet, consectetur</h1>
                <h6>
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                  malesuada. In hendrerit gravida rutrum quisque non tellus orci
                  ac auctor. Pellentesque eu tincidunt tortor aliquam nulla
                  facilisi cras. Ac tincidunt vitae semper quis.
                </h6>
              </div>
            </div>

            <span className={style.ColumnDivider}></span>

            <div className={style.SubColumn}>
              <img
                src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
                alt=""
              />

              <div className={style.SubColumnTextWrap}>
                <h5>f/e/b/e/i/p</h5>
                <h4>Lorem ipsum dolor sit amet, consectetur</h4>
                <h6>
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                  malesuada.
                </h6>
              </div>

              <div className={style.ContentSeparator}></div>

              <div className={style.SubColumnTextWrap}>
                <h5>f/e/b/e/i/p</h5>
                <h4>Lorem ipsum dolor sit amet, consectetur</h4>
                <h6>
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                  malesuada.
                </h6>
              </div>

              <div className={style.ContentSeparator}></div>

              <div className={style.SubColumnTextWrap}>
                <h5>f/e/b/e/i/p</h5>
                <h4>Lorem ipsum dolor sit amet, consectetur</h4>
                <h6>
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                  malesuada.
                </h6>
              </div>
            </div>

            <span className={style.ColumnDivider}></span>

            <div className={style.SubColumn}>
              <div
                className={style.SubColumnTextWrap}
                style={{ margin: "0 0 3% 0" }}
              >
                <h5>f/e/b/e/i/p</h5>
                <h4>Lorem ipsum dolor sit amet, consectetur</h4>
                <h6>
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                  malesuada.
                </h6>
              </div>

              <div className={style.ContentSeparator}></div>

              <div className={style.SubColumnTextWrap}>
                <h5>f/e/b/e/i/p</h5>
                <h4>Lorem ipsum dolor sit amet, consectetur</h4>
                <h6>
                  sed do eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Tincidunt nunc pulvinar sapien et ligula ullamcorper
                  malesuada.
                </h6>
              </div>

              <div className={style.ContentSeparator}></div>

              <img
                src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
                alt=""
              />

              <div className={style.SubColumnTextWrap}>
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

      <Footer />
    </div>
  );
}

export default HomePage;
