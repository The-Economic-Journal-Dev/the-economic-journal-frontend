import style from "./Article.module.css";
import React, {HTMLAttributeReferrerPolicy, useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Interweave, Node} from 'interweave';
import {auth} from "../../firebase";
import {User} from "firebase/auth";

const SideColumn = ({category}: { category: string }) => {
    const [apiData, setAPIData] = useState<IArticleData[]>([]);
    const url = `https://api.theeconomicjournal.org/articles?includeHTML=true&category=${category}`;

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
    }, [url]);

    return (
        <aside className={style.SideBar}>
            <h3>Read more articles here</h3>
            {apiData.length > 0 ? (
                <Link to={`/articles/${apiData[0].metaTitle}`} className={style.SideBarArticle}>
                    <img
                        src={apiData[0].imageUrl || ""}
                        alt="Sidebar Article"
                        loading="lazy" // Lazy load images for better performance
                        referrerPolicy="no-referrer"
                    />
                    <p>{apiData[0].summary || ""}</p>
                </Link>
            ) : (
                <p>Loading...</p>
            )}
            {/* Add more articles similarly */}
        </aside>
    )
}

const LikeButton = ({currentUser, metaTitle, currentLikes}: {
    currentUser: User | null,
    metaTitle: string,
    currentLikes: number
}) => {
    const [likes, setLikes] = useState<number>(currentLikes);
    const [isLiked, setIsLiked] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleLikeUnlike = async () => {
        if (!metaTitle) {
            return (<button
                onClick={handleLikeUnlike}
                className={style.LikeButton}
            >
                {"Like"} {likes}
            </button>)
        }

        if (!currentUser) {
            navigate("/signin")
        }

        try {
            const method = isLiked ? "DELETE" : "POST";
            const response = await fetch(
                `https://api.theeconomicjournal.org/articles/${metaTitle}/like`,
                {
                    method: method,
                    headers: {
                        "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}`
                    }
                }
            );

            const updatedArticle = await response.json();
            console.log(updatedArticle.likes);
            setLikes(updatedArticle.likes);
            setIsLiked(!isLiked);
        } catch (error) {
            console.error(
                `Error ${isLiked ? "unliking" : "liking"} the article:`,
                error
            );
            // Optionally, you can set an error state or show a notification to the user
        }
    };

    return (
        <button
            onClick={handleLikeUnlike}
            className={`${style.LikeButton} ${isLiked ? style.Liked : ""}`}
        >
            {isLiked ? "Unlike" : "Like"} {likes}
        </button>
    )
}

const ArticlePage: React.FC<{ previewArticle?: IArticleData }> = ({previewArticle}) => {
    const {metaTitle} = useParams<{ metaTitle: string }>();
    const [articleData, setArticleData] = useState<IArticleData>(); // Adjust type as needed
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [lastDate, setLastDate] = useState<string>("");
    const [authorName, setAuthorName] = useState<string>("");
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
            } else {
                setCurrentUser(null);
            }
        });

        // Clean up the subscription on unmount
        return () => unsubscribe();
    }, []);


    useEffect(() => {
        // Fetch the article data from the API
        const fetchArticleData = async () => {
            try {
                const response = await fetch(
                    `https://api.theeconomicjournal.org/articles/${metaTitle}`
                );

                const result = await response.json();
                setArticleData(result.article);
                await fetchUserName(result.article);
                updateLastDate(result.article);
            } catch (error) {
                setError("Failed to load article");
            } finally {
                setLoading(false);
            }
        };

        const updateLastDate = (articleData: IArticleData) => {
            if (articleData.lastUpdated > articleData.datePublished) {
                setLastDate(
                    "Last Updated: " +
                    new Date(articleData.lastUpdated).toLocaleDateString()
                );
            } else {
                setLastDate(
                    "Date Published: " +
                    new Date(articleData.datePublished).toLocaleDateString()
                );
            }
        };

        const fetchUserName = async (article: IArticleData) => {
            try {
                const response = await fetch(
                    `https://api.theeconomicjournal.org/users/${article.authorUid}`
                );
                const user = await response.json();
                setAuthorName(user.displayName || "Unknown Author");
            } catch (error) {
                console.error("Error fetching user name:", error);
                setAuthorName("Unknown Author");
            }
        };

        if (!previewArticle) {
            fetchArticleData();
        } else {
            setArticleData(previewArticle);
            setLastDate(
                "Last Updated: " +
                new Date().toLocaleDateString()
            );
            if (articleData?.authorName) {
                setAuthorName(articleData.authorName)
            } else if (auth.currentUser?.displayName) {
                setAuthorName(auth.currentUser.displayName);
            }
            setLoading(false)
        }
    }, [metaTitle]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error || !articleData) {
        return <p>{error}</p>;
    }

    /**
     * Converts a CSS style string into a generic style object.
     * @param styleString - The inline style string to convert.
     * @returns A style object that can be used in a React component.
     */
    const parseStyleString = (styleString: string): Record<string, string> => {
        return styleString.split(';').reduce((styleObject, styleProperty) => {
            const [property, value] = styleProperty.split(':').map(part => part.trim());
            if (property && value) {
                styleObject[property] = value;
            }
            return styleObject;
        }, {} as Record<string, string>);
    };

    /**
     * Transforms an HTML node into a React node, specifically handling 'img' tags.
     * @param node - The HTML node to transform.
     * @param children - The child nodes of the HTML node.
     * @returns A React node that represents the transformed HTML node.
     */
    const transform = (node: HTMLElement, children: Node[]): React.ReactNode => {
        if (node.tagName.toLowerCase() === 'img') {
            const referrerPolicy = node.getAttribute('referrerpolicy') as HTMLAttributeReferrerPolicy;
            const styleString = node.getAttribute('style') || '';
            const styleObject = parseStyleString(styleString);

            return (
                <img
                    src={node.getAttribute('src') || ''}
                    alt={node.getAttribute('alt') || ''}
                    style={styleObject}
                    referrerPolicy={referrerPolicy || 'no-referrer'}
                    className={style.ArticleImage}
                />
            );
        }
    };

    return (
        <div>
            <div className={style.MainContentWrap}>
                <div className={style.MetaData}>
                    <p className={style.Section}>{articleData.category} Section</p>
                    <p className={style.Name}></p>
                </div>
                <h1 className={style.Title}>{articleData.title}</h1>

                {articleData.imageUrl && (
                    <div className={style.ImageContainer}>
                        <img
                            src={articleData.imageUrl}
                            alt={`${articleData.title}'s Image`}
                            className={style.MainImage}
                            loading="lazy"
                            referrerPolicy="no-referrer"
                        />
                        <p className={style.ImageSource}>
                            {/*{articleData.imageUrl ? "image source" : ""}*/}
                        </p>
                    </div>
                )}

                <div className={style.TextWithSidebar}>
                    <div className={style.MainText}>
                        <div className={style.ArticleInfo}>
                            <p>{lastDate}</p>
                            <h1>{articleData.title}</h1>
                            <strong>by -{authorName}-</strong>
                            <LikeButton currentUser={currentUser} metaTitle={metaTitle!}
                                        currentLikes={articleData.likesCount}/>
                        </div>
                        <p className={style.ArticleContent}>
                            <Interweave content={articleData.articleBody} transform={transform}/>
                        </p>
                    </div>

                    <SideColumn category={articleData.category}/>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
