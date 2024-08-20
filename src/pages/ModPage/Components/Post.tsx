import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./Post.module.css";
import Converter from "./Converter";
import { auth } from "../../../firebase";

const WebsiteSelector = ({
  selectedValue,
  onSelectChange,
}: {
  selectedValue: string;
  onSelectChange: (value: string) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue);
  };

  return (
    <select value={selectedValue} onChange={handleChange}>
      <option value="">Select page</option>
      <option value="Finance">Finance</option>
      <option value="Economic">Economic</option>
      <option value="Business">Business</option>
      <option value="Entrepreneur">Entrepreneur</option>
    </select>
  );
};

const PositionSelector = ({
  selectedValue,
  options,
  onSelectChange,
}: {
  selectedValue: string;
  options: string[];
  onSelectChange: (value: string | number) => void;
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue);
  };

  return (
    <select value={selectedValue} onChange={handleSelectChange}>
      <option value="">Select position</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export const PostSelector = ({
  selectedWebsite,
  selectedPosition,
  onWebsiteChange,
  options,
  onPositionChange,
}: {
  selectedWebsite: string;
  selectedPosition: string;
  onWebsiteChange: (value: string) => void;
  options: string[];
  onPositionChange: (value: string | number) => void;
}) => {
  return (
    <div className={style.postSelector}>
      <WebsiteSelector
        selectedValue={selectedWebsite}
        onSelectChange={onWebsiteChange}
      />
      <PositionSelector
        selectedValue={selectedPosition}
        options={options}
        onSelectChange={onPositionChange}
      />
    </div>
  );
};

function toTitleCase(str: String) {
  return str.replace(
    /\w\S*/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
  );
}

interface InputData {
  title: string;
  summary: string;
  metaTitle: string;
  articleBody: string;
}

const Post = () => {
  const [targetPage, setTargetPage] = useState(() => {
    return localStorage.getItem("targetPage") || "";
  });
  const [targetPosition, setTargetPosition] = useState(() => {
    return localStorage.getItem("targetPosition") || "";
  });
  const [options, setOptions] = useState<string[]>([]);
  const [hasImage, setHasImage] = useState(false);
  const [inputData, setInputData] = useState<InputData>(() => {
    const savedData = localStorage.getItem("articleData");
    return savedData
      ? JSON.parse(savedData)
      : {
          title: "",
          summary: "",
          metaTitle: "",
          articleBody: "",
        };
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [posted, setPosted] = useState(false);

  useEffect(() => {
    localStorage.setItem("articleData", JSON.stringify(inputData));
  }, [inputData]);

  useEffect(() => {
    localStorage.setItem("targetPage", targetPage);
  }, [targetPage]);

  useEffect(() => {
    localStorage.setItem("targetPosition", targetPosition);
  }, [targetPosition]);

  const handleEditorChange = (value: string) => {
    setInputData((prevState) => ({
      ...prevState,
      articleBody: value,
    }));
  };

  const dynamicInputs = (pageOption: string, positionOption: string) => {
    if (
      ["Finance", "Economic", "Business", "Entrepreneur"].includes(pageOption)
    ) {
      setHasImage(true);
    } else {
      setHasImage(false);
    }
  };

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

    dynamicInputs(option, "");
  };

  const handlePositionChange = (position: string | number) => {
    dynamicInputs(targetPage, position.toString());

    const positionIndex = options.indexOf(position.toString());
    setTargetPosition((positionIndex + 1).toString());
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0]);
    }
  };

  const postData = async (myPostData: FormData) => {
    const url = "https://api.theeconomicjournal.org/articles";
    const token = await auth.currentUser?.getIdToken();

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
        },
        body: myPostData,
      });

      const responseBody = await response.json();
      console.log(response);

      console.log("Status:", response.status);
      console.log("Response:", responseBody);

      if (responseBody.success) {
        setPosted(true);
        setError("");
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(`Submit`);

    const formData = new FormData();
    formData.append("title", inputData.title);
    formData.append("summary", inputData.summary);
    formData.append("metaTitle", inputData.metaTitle);
    formData.append("articleBody", inputData.articleBody);
    formData.append("category", toTitleCase(targetPage));
    formData.append("position", targetPosition);
    if (true) {
      if (imageFile) {
        formData.append("image", imageFile);
        postData(formData);
      } else {
        setError("No Image selected");
      }
    } else {
      postData(formData);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={style.modForm}>
        <PostSelector
          selectedWebsite={targetPage}
          selectedPosition={targetPosition}
          onWebsiteChange={handleWebsiteChange}
          options={options}
          onPositionChange={handlePositionChange}
        />

        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={inputData.title}
          onChange={handleInput}
        />

        <label htmlFor="summary">Summary</label>
        <input
          type="text"
          name="summary"
          value={inputData.summary}
          onChange={handleInput}
        />

        <label htmlFor="metaTitle">Meta Title</label>
        <input
          type="text"
          name="metaTitle"
          value={inputData.metaTitle}
          onChange={handleInput}
        />

        <label htmlFor="articleDocxUpload">Upload .docx Instead</label>
        <div>
          <Converter
            inputData={inputData}
            handleEditorChange={handleEditorChange}
          ></Converter>
        </div>

        <label htmlFor="articleBody">Content</label>
        <div className={style.quillContainer}>
          <ReactQuill
            theme="snow"
            value={inputData.articleBody}
            onChange={handleEditorChange}
          />
        </div>

        {true && (
          <>
            <label htmlFor="Image">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageInput}
            ></input>
          </>
        )}

        {error != "" && <h5 style={{ color: "red" }}>{error}</h5>}
        {posted && <h5 style={{ color: "green" }}>Posted Successfully</h5>}

        <button type="submit">Post</button>
      </form>
    </>
  );
};

export default Post;
