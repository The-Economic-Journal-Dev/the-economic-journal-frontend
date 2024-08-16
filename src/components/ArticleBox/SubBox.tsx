import style from "./SubBox.module.css"
import thumbsUpLogo from "../../../public/thumbs_up.png";
import commentLogo from "../../../public/comment.png";

function SubBox() {
    return(
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
              <img src={thumbsUpLogo} alt="" />X
            </button>
            <button className={style.CommentButton}>
              <img src={commentLogo} alt="" />X
            </button>
            <h6>dd/mm/yyyy</h6>
          </div>
        </div>
        <img
          src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
        />
      </div>
    )
}

export default SubBox;