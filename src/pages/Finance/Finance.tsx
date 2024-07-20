import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer"
import style from "./Finance.module.css"

const Finance = () => {
  return (
    <div>
      <Header />
      <div className={style.PageTitle}>Finance</div>
      <div className={style.MainContentWrap}>
        <div className={style.MainContentBGRectangle} />
        <div className={style.MainContent}>
          <img
            src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
            alt=""
          />

          <div className={style.MainContentTextWrap}>
            <h1>Lorem ipsum dolor sit amet, consectetur</h1>
            <h6>
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada. In
              hendrerit gravida rutrum quisque non tellus orci ac auctor.
              Pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Ac
              tincidunt vitae semper quis.
            </h6>
          </div>
        </div>
      </div>

      <div className={style.SubPostWrap}>
        <div className={style.SubPostContent}>
          <h2>Lorem ipsum dolor sit amet, consectetur</h2>
          <h6 style={{ fontStyle: "italic", fontWeight: "bold" }}>AUTHOR</h6>
          <h6>
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada.
          </h6>
          <div className={style.SubPostActionBar}>
            <button className={style.LikeButton}>
              <img src="../../src/assets/thumbs_up.png" alt="" />X
            </button>
            <button className={style.CommentButton}>
              <img src="../../src/assets/comment.png" alt="" />X
            </button>
            <h6>dd/mm/yyyy</h6>
          </div>
        </div>
        <img
          src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
          alt=""
        />
      </div>

      <div className={style.SubPostWrap}>
        <div className={style.SubPostContent}>
          <h2>Lorem ipsum dolor sit amet, consectetur</h2>
          <h6 style={{ fontStyle: "italic", fontWeight: "bold" }}>AUTHOR</h6>
          <h6>
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada.
          </h6>
          <div className={style.SubPostActionBar}>
            <button className={style.LikeButton}>
              <img src="../../src/assets/thumbs_up.png" alt="" />X
            </button>
            <button className={style.CommentButton}>
              <img src="../../src/assets/comment.png" alt="" />X
            </button>
            <h6>dd/mm/yyyy</h6>
          </div>
        </div>
        <img
          src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
          alt=""
        />
      </div>

      <div className={style.SubPostWrap}>
        <div className={style.SubPostContent}>
          <h2>Lorem ipsum dolor sit amet, consectetur</h2>
          <h6 style={{ fontStyle: "italic", fontWeight: "bold" }}>AUTHOR</h6>
          <h6>
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada.
          </h6>
          <div className={style.SubPostActionBar}>
            <button className={style.LikeButton}>
              <img src="../../src/assets/thumbs_up.png" alt="" />X
            </button>
            <button className={style.CommentButton}>
              <img src="../../src/assets/comment.png" alt="" />X
            </button>
            <h6>dd/mm/yyyy</h6>
          </div>
        </div>
        <img
          src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
          alt=""
        />
      </div>

      <div className={style.SubPostWrap}>
        <div className={style.SubPostContent}>
          <h2>Lorem ipsum dolor sit amet, consectetur</h2>
          <h6 style={{ fontStyle: "italic", fontWeight: "bold" }}>AUTHOR</h6>
          <h6>
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Tincidunt nunc pulvinar sapien et ligula ullamcorper malesuada.
          </h6>
          <div className={style.SubPostActionBar}>
            <button className={style.LikeButton}>
              <img src="../../src/assets/thumbs_up.png" alt="" />X
            </button>
            <button className={style.CommentButton}>
              <img src="../../src/assets/comment.png" alt="" />X
            </button>
            <h6>dd/mm/yyyy</h6>
          </div>
        </div>
        <img
          src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
          alt=""
        />
      </div>

      <Footer />
    </div>
  );
};

export default Finance;