import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";

import style from "./ModPage.module.css";
import { auth } from "../../firebase";

const WebsiteSelector = ({
  onSelectChange,
}: {
  onSelectChange: (value: string) => void;
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue);
  };

  return (
    <select onChange={handleChange}>
      <option value="">Select website to post in</option>
      <option value="HomePage">Home Page</option>
      <option value="Finance">Finance</option>
      <option value="Economic">Economic</option>
      <option value="Business">Business</option>
      <option value="Entrepreneur">Entrepreneur</option>
    </select>
  );
};

const PositionSelector = ({
  options,
  onSelectChange,
}: {
  options: string[];
  onSelectChange: (value: string) => void;
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    onSelectChange(selectedValue);
  };

  return (
    <select onChange={handleSelectChange}>
      <option value="">Select position to post in</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const PostSelector = ({
  onWebsiteChange,
  options,
  onPositionChange,
}: {
  onWebsiteChange: (value: string) => void;
  options: string[];
  onPositionChange: (value: string) => void;
}) => {
  return (
    <div>
      <WebsiteSelector onSelectChange={onWebsiteChange} />
      <PositionSelector options={options} onSelectChange={onPositionChange} />
    </div>
  );
};

const ModPage = () => {
  const [targetPage, setTargetPage] = useState("");
  const [targetPosition, setTargetPosition] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [hasImage, setHasImage] = useState(false);
  const [inputData, setInputData] = useState({
    title: "",
    summary: "",
    metaTitle: "",
    articleBody: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const { quill, quillRef } = useQuill();

  useEffect(() => {
    if (quill) {
      quill.on("text-change", () => {
        setInputData((prevState) => ({
          ...prevState,
          ["articleBody"]: quill.root.innerHTML,
        }));
      })
    }
  })

  //Dynamically changing the input boxes to match the post content
  const dynamicInputs = (pageOption: string, positionOption: string) => {
    if (pageOption == "HomePage") {
      if (
        [
          "Main col 1",
          "Main col 2 row 1",
          "Main col 3 row 3",
          "Trending 1",
          "Trending 2",
          "Trending 3",
        ].includes(positionOption)
      ) {
        setHasImage(true);
      } else {
        setHasImage(false);
      }
    } else if (
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

    // Update the options for the second dropdown based on the selected option
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

    dynamicInputs(targetPage, "");
  };

  const handlePositionChange = (position: string) => {

    //Dynamically changing the inputs based on the page and position chose
    dynamicInputs(targetPage, position);

    const positionIndex = options.indexOf(position) //Getting the custom index of position on the page to send to API
    setTargetPosition((positionIndex + 1).toString())
  };

  //Collect form data
  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImageFile(event.target.files[0])
    }
  }

  //Send data to API

  const postData = async(myPostData : FormData) => {
    const url = "https://api.derpdevstuffs.org/articles";
    const token = await auth.currentUser?.getIdToken()

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token
        },
        body: myPostData
      });
      
      //Log the response status and body for debugging
      const responseBody = await response.json();
      console.log('Status:', response.status);
      console.log('Response:', responseBody);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

    } catch (error) {
      console.log(error)
      throw error;
    }
  }

  //Handle Submit
  const handleSubmit = (e : FormEvent) => {
    e.preventDefault()

    const formData = new FormData();
    formData.append("title", inputData.title)
    formData.append("summary", inputData.summary);
    formData.append("metaTitle", inputData.metaTitle);
    formData.append("articleBody", inputData.articleBody);
    formData.append("category", targetPage.toLowerCase())
    formData.append("position", targetPosition)
    if (hasImage) {
      if (imageFile) {
        formData.append("imageFile", imageFile)
        postData(formData)
      } else {
        setError("No Image selected")
      }
    } else {
      postData(formData)
    }
  }


  return (
    <main>
      <Header />
      <form onSubmit={handleSubmit} className={style.modForm}>
        <PostSelector
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

        <label htmlFor="articleBody">Content</label>
        <div ref={quillRef}></div>

        {hasImage && (
          <>
            <label htmlFor="Image">Image</label>
            <input type="file" name="image" accept="image/*" onChange={handleImageInput}></input>
          </>
        )}

        {error != "" && (<h5 style={{color: "red"}}>{error}</h5>)}

        <button type="submit">Post</button>
      </form>
    </main>
  );
};

export default ModPage;
