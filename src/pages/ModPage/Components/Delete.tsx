import { auth } from "../../../firebase";
import { PostSelector } from "./Post";
import { FormEvent, useState } from "react";
import style from "./Delete.module.css";

interface IArticleData {
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
  position: number;
}

interface DisplayData {
  title: string;
  datePublished: string;
  summary: string;
  category: string;
  position: string;
}

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

const CurrentArticleInfo = ({
  targetArticle,
}: {
  targetArticle: DisplayData;
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
  const [displayData, setDisplayData] = useState<DisplayData>();
  const [displayPopUp, setDisplayPopUp] = useState(false);
  const [error, setError] = useState("");
  const [confirmedDelete, setConfirmedDelete] = useState(false);

  const handleWebsiteChange = (currentTargetPage: string) => {
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

    console.log(currentTargetPage, targetPosition);

    if (targetPosition) {
      getMetaData(targetPosition, currentTargetPage); // Index of target position
    }
  };

  const handlePositionChange = (position: number | string) => {
    const positionIndex = options.indexOf(position.toString());
    setTargetPosition(positionIndex + 1);
    getMetaData(positionIndex + 1, targetPage);
    setError("");
  };

  const getMetaData = async (
    positionIndex: number,
    currentTargetPage: string
  ) => {
    if (positionIndex) {
      const url = `https://api.theeconomicjournal.org/articles?category=${toTitleCase(
        currentTargetPage
      )}`;

      try {
        const response = await fetch(url, { method: "GET" });
        const posts = (await response.json()).articles as Array<IArticleData>;

        const filteredArticles = posts.filter(
          (article) => article.position === positionIndex
        );

        if (filteredArticles.length > 0) {
          const currentTargetArticle = filteredArticles[0];
          setTargetArticle(currentTargetArticle);

          setDisplayData({
            title: currentTargetArticle.title,
            datePublished: currentTargetArticle.datePublished.toLocaleString(),
            summary: currentTargetArticle.summary || "",
            category: currentTargetArticle.category,
            position: currentTargetArticle.position.toString(),
          });
        } else {
          setDisplayData(undefined);
          setTargetArticle(undefined);
          setError("No article found");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch article");
      }
    }
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
        throw new Error(`HTTP error! status: ${response.status}`);
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
        onWebsiteChange={handleWebsiteChange}
        options={options}
        onPositionChange={handlePositionChange}
      />
      {targetArticle && targetArticle.imageUrl && (
        <img src={targetArticle.imageUrl} alt="Article image" />
      )}

      {displayData && <CurrentArticleInfo targetArticle={displayData} />}

      {error && <p style={{ color: "red" }}>{error}</p>}

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
