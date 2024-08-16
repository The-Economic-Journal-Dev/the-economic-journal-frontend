import { auth } from "../../../firebase";
import { PostSelector } from "./Post";
import { FormEvent, useState } from "react";
import style from "./Delete.module.css"

function toTitleCase(str: string) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

const Delete = () => {
  const [targetPage, setTargetPage] = useState("");
  const [targetPosition, setTargetPosition] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [metaTitle, setMetaTitle] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [title, setTitle] = useState("");
  const [currentArticles, setCurrentArticles] = useState<any[]>()

  const handleWebsiteChange = (option: string) => {
    setTargetPage(option);
    setTargetPosition("");

    if (option === "HomePage") {
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
      ["Finance", "Economic", "Business", "Entrepreneur"].includes(option)
    ) {
      setOptions(["Main", "Sub1", "Sub2", "Sub3", "Sub4"]);
    } else {
      setOptions([]);
    }

    getMetaTitle(Number(targetPosition))
  };

  const handlePositionChange = (position: string) => {
    const positionIndex = options.indexOf(position);
    setTargetPosition((positionIndex + 1).toString());
    getMetaTitle(positionIndex + 1);
  };

  const getMetaTitle = async (positionIndex: number) => {
    if (targetPosition || positionIndex) {
      const url = `https://api.derpdevstuffs.org/articles?category=${toTitleCase(targetPage)}`;

      try {
        const response = await fetch(url, { method: "GET" });
        const responseBody = await response.json();
        console.log("Status:", response.status);
        console.log("Response:", responseBody);
        
        const filteredArticles = responseBody.articles.filter((article: any) => article.position == (targetPosition || positionIndex));
        setCurrentArticles(filteredArticles);

        if (filteredArticles.length > 0) {
          const currentMetaTitle = filteredArticles[0].metaTitle;
          const currentImageURL = filteredArticles[0].imageUrl || "";
          const currentTitle = filteredArticles[0].title || "";

          setMetaTitle(currentMetaTitle);
          setImageURL(currentImageURL);
          setTitle(currentTitle);
        } else {
          setMetaTitle("");
          setImageURL("");
          setTitle("");
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    } else {
      setMetaTitle("");
      setImageURL("");
      setTitle("");
    }
  };

  const deleteData = async () => {
    if (!metaTitle) {
      console.error('MetaTitle is not set.');
      return;
    }

    const url = `https://api.derpdevstuffs.org/articles/${metaTitle}`;
    const token = await auth.currentUser?.getIdToken();

    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const responseBody = await response.json();
      console.log("Status:", response.status);
      console.log("Response:", responseBody);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await deleteData();
    } catch (error) {
      console.error('Failed to delete data:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PostSelector
        onWebsiteChange={handleWebsiteChange}
        options={options}
        onPositionChange={handlePositionChange}
      />
      {imageURL && <img src={imageURL} alt="Article image" />}
      {title && <h1>{title}</h1>}

      <button type="submit">Delete</button>
    </form>
  );
};

export default Delete;
