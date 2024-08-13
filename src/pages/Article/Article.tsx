import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import style from "./Article.module.css";

const ArticlePage = () => {
  return (
    <div>
      <Header />
      <div className={style.MainContentWrap}>
        <div className={style.MetaData}>
          <p className={style.Section}>Economic Section</p>
          <p className={style.Name}>-NAME-</p>
        </div>
        <h1 className={style.Title}>Lorem ipsum dolor sit amet, consectetur</h1>
        <div className={style.ImageContainer}>
          <img
            src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
            alt="Main Content"
            className={style.MainImage}
          />
          <p className={style.ImageSource}>image source</p>
        </div>

        <div className={style.TextWithSidebar}>
          <div className={style.MainText}>
            <div className={style.ArticleInfo}>
              <p>date uploaded/date updated</p>
              <h1>TITLE</h1>
              <strong>by -AUTHOR-</strong>
            </div>
            <p className={style.ArticleContent}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique accumsan odio vitae
                        tincidunt. Suspendisse
                        nunc sem, fermentum luctus varius sed, placerat aliquam turpis. Quisque tempus venenatis nunc et
                        elementum. Mauris
                        cursus dapibus dictum. Integer lacinia ipsum at eleifend blandit. Quisque neque erat, ultricies
                        vel
                        dignissim ac,
                        placerat convallis dolor. Phasellus faucibus bibendum libero, sed vehicula tellus consectetur
                        nec.
                        Sed diam eros,
                        elementum et lacus sed, vehicula dignissim libero. Orci varius natoque penatibus et magnis dis
                        parturient montes,
                        nascetur ridiculus mus. Mauris vitae magna feugiat, volutpat enim in, ullamcorper mi. Praesent
                        faucibus urna augue, quis
                        scelerisque sem mattis quis. Ut pulvinar diam vitae lectus sodales, ac condimentum ex feugiat.
                        Praesent vel pellentesque
                        mi, a ullamcorper nunc.

                        Integer in mauris scelerisque, posuere lectus eget, vestibulum mi. In tincidunt tincidunt
                        mollis. In
                        quis magna mollis,
                        accumsan sapien quis, malesuada lacus. Cras aliquet dignissim elit. Cras lectus nisi, consequat
                        in
                        enim at, bibendum
                        placerat sem. Nulla rutrum odio ut facilisis tempus. Vestibulum ac risus vel sem tempus
                        ullamcorper
                        vel sed lacus.
                        Praesent vel odio ornare, lobortis quam tempus, tempor est. Fusce iaculis, libero quis
                        consectetur
                        facilisis, ipsum
                        neque dictum magna, in tristique sapien odio luctus eros. Fusce nec rhoncus erat. Aenean et
                        massa
                        leo. Aenean ultricies,
                        nisl et mollis aliquam, nisi dolor mattis leo, vel euismod sem ex sodales lacus. Nam ex lorem,
                        bibendum non arcu sit
                        amet, sollicitudin venenatis quam. Proin laoreet tortor in consectetur tristique. Nam nec augue
                        eget
                        risus aliquet
                        sagittis.

                        Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam convallis quam magna, eget
                        consequat ante
                        sollicitudin vitae. Cras et quam ac risus efficitur pulvinar. Morbi a libero magna. Nullam
                        faucibus
                        iaculis ullamcorper.
                        Sed vel dolor malesuada, tincidunt ipsum vel, dignissim diam. Ut massa nulla, dapibus id
                        vehicula
                        et, semper auctor
                        mauris. Maecenas in ornare urna, id vestibulum erat. Donec tincidunt efficitur magna non semper.
                        Integer euismod maximus
                        felis, ultricies luctus turpis. Curabitur posuere sit amet est egestas pretium. Donec tristique
                        sem
                        nec magna fermentum
                        laoreet. Aliquam erat volutpat. Aliquam gravida turpis sollicitudin, mollis neque in, maximus
                        dolor.
                        Donec dictum
                        hendrerit sem sed lobortis.

                        Maecenas hendrerit lorem arcu, a rhoncus mi finibus sed. Maecenas imperdiet in mauris id
                        convallis.
                        Cras vestibulum nec
                        mi eget euismod. Suspendisse lectus orci, interdum et sagittis vel, sollicitudin vel felis. Ut
                        interdum, eros vel
                        egestas condimentum, libero erat semper lorem, nec dictum nibh libero at velit. Duis finibus
                        enim
                        lacus, et blandit ante
                        pulvinar vitae. Donec eleifend massa id fringilla pulvinar. Pellentesque imperdiet purus lorem,
                        quis
                        eleifend elit
                        aliquam cursus. In eget turpis egestas, aliquam nisl sed, cursus mi. Sed a nulla eu arcu
                        accumsan
                        tempor et id dolor.
                        Curabitur nec orci sit amet nunc tristique vehicula. Ut in fermentum nisi.

                        Pellentesque maximus ex in nulla lobortis ultrices. Morbi accumsan congue ipsum eu tempor.
                        Aenean at
                        magna convallis,
                        luctus metus a, fringilla nunc. Nulla sagittis consequat massa at porttitor. Ut non varius
                        velit.
                        Maecenas nunc velit,
                        ultricies mattis fermentum vitae, vestibulum sed mi. Praesent in est a turpis mattis accumsan ac
                        ut
                        felis. In vel ex
                        quis ante pretium feugiat. Mauris augue velit, placerat a lectus sed, auctor molestie quam. In
                        sodales metus nec purus
                        consequat mattis. Pellentesque ornare, massa ac convallis porttitor, justo ligula fermentum
                        nibh,
                        eget cursus augue
                        neque at erat. Sed mollis, est a pulvinar vestibulum, orci massa malesuada arcu, rhoncus
                        malesuada
                        purus nibh sed nisl.
                        Praesent posuere purus ut nulla auctor laoreet ac a dolor. Donec et iaculis neque. Orci varius
                        natoque penatibus et
                        magnis dis parturient montes, nascetur ridiculus mus.

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tristique accumsan odio vitae
                        tincidunt. Suspendisse
                        nunc sem, fermentum luctus varius sed, placerat aliquam turpis. Quisque tempus venenatis nunc et
                        elementum. Mauris
                        cursus dapibus dictum. Integer lacinia ipsum at eleifend blandit. Quisque neque erat, ultricies
                        vel
                        dignissim ac,
                        placerat convallis dolor. Phasellus faucibus bibendum libero, sed vehicula tellus consectetur
                        nec.
                        Sed diam eros,
                        elementum et lacus sed, vehicula dignissim libero. Orci varius natoque penatibus et magnis dis
                        parturient montes,
                        nascetur ridiculus mus. Mauris vitae magna feugiat, volutpat enim in, ullamcorper mi. Praesent
                        faucibus urna augue, quis
                        scelerisque sem mattis quis. Ut pulvinar diam vitae lectus sodales, ac condimentum ex feugiat.
                        Praesent vel pellentesque
                        mi, a ullamcorper nunc.
            </p>
          </div>

          <aside className={style.SideBar}>
            <h3>Read more articles here</h3>
            <div className={style.SideBarArticle}>
              <img
                src="https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
                alt="Sidebar Article"
              />
              <p>Lorem ipsum dolor sit amet, consectetur</p>
            </div>
            {/* Add more articles similarly */}
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ArticlePage;
