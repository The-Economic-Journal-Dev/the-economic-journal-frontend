import {auth} from "../../../firebase";
import {PostSelector} from "./Post";
import {FormEvent, useState} from "react";
import style from "./Delete.module.css";

function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}


const CurrentArticleInfo = ({targetArticle}: {
    targetArticle: IArticleData;
}) => {
    return (
        <>
            {Object.entries(targetArticle).map(([key, value]) => (
                <p key={key}>
                    {key} : {String(value)}
                </p>
            ))}
        </>
    );
};

const Delete = () => {
    const [targetPage, setTargetPage] = useState("");
    const [targetPosition, setTargetPosition] = useState(0);
    const [options, setOptions] = useState<string[]>([]);
    const [targetArticle, setTargetArticle] = useState<IArticleData>();
    const [displayData, setDisplayData] = useState<IArticleData[]>();
    const [displayPopUp, setDisplayPopUp] = useState(false);
    const [error, setError] = useState("");

    const getMetaData = async (
        currentTargetPage: string
    ) => {
        if (currentTargetPage) {
            const url = `https://api.theeconomicjournal.org/articles?category=${toTitleCase(
                currentTargetPage
            )}`;

            try {
                const response = await fetch(url, {method: "GET"});
                const articles = (await response.json()).articles as Array<IArticleData>;

                console.log(articles)

                if (articles.length > 0) {
                    console.log(articles)
                    setDisplayData(articles)
                } else {
                    setDisplayData(undefined);
                    setError("No article found");
                }
            } catch (error) {
                console.error(error);
                setError("Failed to fetch article");
            }
        }
    };


    const handleWebsiteChange = async (currentTargetPage: string) => {
        setTargetPage(currentTargetPage);
        setError("");

        if (currentTargetPage === "HomePage") {
            setOptions([
                "Main col 1",
                "Main col 2 row 1",
                "Main col 2 row 2",
                "Main col 2 row 3",
                "Main col 3 row 1",
                "Main col 3 row 2",
                "Main col 3 row 3",
                "Trending 1",
                "Trending 2",
                "Trending 3",
            ]);
        } else if (
            ["Finance", "Economic", "Business", "Entrepreneur"].includes(
                currentTargetPage
            )
        ) {
            setOptions(["Main", "Sub1", "Sub2", "Sub3", "Sub4"]);
        } else {
            setOptions([]);
        }

        console.log(currentTargetPage, targetPosition, "d");


        await getMetaData(currentTargetPage); // Index of target position
    };

    const handlePositionChange = (position: number | string) => {
        const positionIndex = options.indexOf(position.toString());
        setTargetPosition(positionIndex + 1);
        setError("");
    };

    const deleteData = async () => {
        if (!targetArticle?.metaTitle) {
            setError("Post doesn't exist");
            return;
        }

        const url = `https://api.theeconomicjournal.org/articles/${targetArticle.metaTitle}`;
        const token = await auth.currentUser?.getIdToken();

        try {
            const response = await fetch(url, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setError(`HTTP error! status: ${response.status}`);
            }

            console.log("Delete successful");
            setDisplayPopUp(false); // Close popup after deletion
            setTargetArticle(undefined); // Clear targetArticle
        } catch (error) {
            console.error(error);
            setError("Delete Successful");
        }
    };

    const confirmDelete = () => {
        if (!targetPage) {
            setError("Missing page");
        } else if (!targetPosition) {
            setError("Missing position");
        } else {
            setError("");
            setDisplayPopUp(true); // Show confirmation popup
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            await deleteData();
        } catch (error) {
            console.error("Failed to delete data:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={style.deleteWrap}>
            <PostSelector
                selectedWebsite={targetPage}
                selectedPosition={targetPosition.toString()}
                onWebsiteChange={handleWebsiteChange}
                options={options}
                onPositionChange={handlePositionChange}
            />

            {targetArticle && targetArticle.imageUrl && (
                <img src={targetArticle.imageUrl} alt="Article image"/>
            )}

            {targetArticle && <CurrentArticleInfo targetArticle={targetArticle}/>}

            <div>
                {displayData?.map((article) => (
                    <button key={article.metaTitle} style={{marginBottom: '20px'}}
                            onClick={(event) => {
                                event.preventDefault();
                                setTargetArticle(article);
                            }}>
                        <h2>{article.title}</h2>
                        <p><strong>Category:</strong> {article.category}</p>
                        <p><strong>Date Published:</strong> {new Date(article.lastUpdated)
                            .toISOString()
                            .slice(0, 10)
                            .replace(/-/g, "/")}</p>
                        {article.imageUrl &&
                            <img src={article.imageUrl} alt={article.title} style={{width: '100px', height: '100px'}}
                                 loading="lazy" referrerPolicy="no-referrer"/>}
                        {article.summary && <p><strong>Summary:</strong> {article.summary}</p>}
                        <p><strong>Likes:</strong> {article.likesCount}</p>
                    </button>
                ))}
            </div>

            {error && <p style={{color: "red"}}>{error}</p>}

            <button type="button" onClick={confirmDelete}>
                Delete
            </button>

            {displayPopUp && (
                <div className={style.popUp}>
                    <p>Are you sure you want to delete article: {targetArticle?.title}</p>

                    <div className={style.popUpButtonWrap}>
                        <button type="submit">Confirm Delete</button>
                        <button type="button" onClick={() => setDisplayPopUp(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </form>
    );
};

export default Delete;
