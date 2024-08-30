import style from "./MainBox.module.css";
import {Link} from "react-router-dom";

type MainBoxProps = {
    isLoading: boolean;
    article: IArticleData;
};

function cropText(input: string) {
    if (!input) return undefined;

    const maxLength = 256;
    if (input.length > maxLength) {
        return input.slice(0, maxLength) + "...";
    }
    return input;
}

function MainBox({isLoading, article}: MainBoxProps) {
    return (
        <Link
            to={article.metaTitle ? `/articles/${article.metaTitle}` : "./"}
            className={style.MainContentLink}
        >
            <div className={style.MainContentWrap}>
                <div className={style.MainContentBGRectangle}/>
                <div className={style.MainContent}>
                    {isLoading || !article ? (
                        <div className={`${style.skeleton} ${style.skeletonImg}`}/>
                    ) : (
                        <img
                            src={
                                article.imageUrl ||
                                "https://biggardenfurniture.com.au/wp-content/uploads/2018/08/img-placeholder.png"
                            }
                            width="1024"
                            height="645"
                            alt=""
                            loading="lazy"
                            referrerPolicy="no-referrer"
                            className={style.MainContentImage}
                        />
                    )}

                    <div className={style.MainContentTextWrap}>
                        {isLoading ? (
                            <>
                                <div className={`${style.skeleton} ${style.skeletonH1}`}/>
                                <div className={`${style.skeleton} ${style.skeletonH6}`}/>
                                <div className={`${style.skeleton} ${style.skeletonH6}`}/>
                                <div className={`${style.skeleton} ${style.skeletonH6}`}/>
                            </>
                        ) : (
                            <>
                                <h1>{article.title || "No Title"}</h1>
                                <h6>
                                    {(article.summary
                                            ? cropText(article.summary)
                                            : cropText(article.articleBody.replace(/(<([^>]+)>)/gi, ""))) ||
                                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque posuere egestas dui fermentum lobortis. Donec id consectetur odio, non consectetur lorem. Etiam nec ante sodales arcu vestibulum blandit. Suspendisse leo diam, cursus eu leo a, imperdiet congue ipsum. Quisque fermentum felis mauris, semper lacinia ipsum fringilla pellentesque. Aliquam lacinia fermentum dui rutrum semper. Maecenas id nulla sapien."}
                                </h6>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default MainBox;
