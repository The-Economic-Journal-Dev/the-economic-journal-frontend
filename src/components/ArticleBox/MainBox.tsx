import style from "./MainBox.module.css"

function MainBox() {
    return (
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
      </div>)
}

export default MainBox;