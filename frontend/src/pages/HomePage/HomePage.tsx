import Header from "../../components/Header/Header.tsx";
import Footer from "../../components/Footer/Footer.tsx";
import Body from "../../components/Body/Body.tsx";
import style from "./HomePage.module.css";

function HomePage() {
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
              </div>
            </div>

            <span className={style.ColumnDivider}></span>

            <div className={style.SubColumn}>col3</div>
          </div>
        </div>
      </Body>
      <Footer />
    </div>
  );
}

export default HomePage;
