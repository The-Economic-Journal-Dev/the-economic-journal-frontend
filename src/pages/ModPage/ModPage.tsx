import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Header from "../../components/Header/Header";
import style from "./ModPage.module.css";

const WebsiteSelector = ({ onSelectChange }: { onSelectChange: (value: string) => void }) => {
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

const PositionSelector = ({ options, onSelectChange }: { options: string[], onSelectChange: (value: string) => void }) => {
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

const PostSelector = ({ onWebsiteChange, options, onPositionChange }: { 
  onWebsiteChange: (value: string) => void, 
  options: string[], 
  onPositionChange: (value: string) => void 
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
  const [hasImageDesc, setHasImageDesc] = useState(false);

  //Dynamically changing the input boxes to match the post content
  const dynamicInputs = (pageOption:string, positionOption:string) => {
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
        setHasImageDesc(true);

      } else {
        setHasImage(false);
        setHasImageDesc(true);
      }
    } else if (
      ["Finance", "Economic", "Business", "Entrepreneur"].includes(pageOption)
    ) {
      setHasImage(true);
      setHasImageDesc(false);
    } else {
      setHasImage(false);
      setHasImageDesc(false);
    }
  };

  const handleWebsiteChange = (option: string) => {
    setTargetPage(option);
  
    setTargetPosition("");

    // Update the options for the second dropdown based on the selected option
    if (targetPosition === "HomePage") {
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

    dynamicInputs(targetPosition, "")
  };

  const handlePositionChange = (position: string) => {
    setTargetPosition(position);

    //Dynamically changing the inputs based on the page and position chose
    dynamicInputs(targetPage, position)
  };

  useForm({
    mode: "onSubmit",
    defaultValues: {
      Title: "Title",
    },
  });

  return (
    <main>
      <Header />
      <form action="" className={style.modForm}>
        <PostSelector
          onWebsiteChange={handleWebsiteChange}
          options={options}
          onPositionChange={handlePositionChange}
        />

        <label htmlFor="title">Title</label>
        <input type="text" name="title" />

        <label htmlFor="content">Content</label>
        <ReactQuill />

        {hasImage && (
          <>
            <label htmlFor="Image">Image</label>
            <input type="file" name="image" accept="image/*"></input>
          </>
        )}

        {hasImageDesc && (
          <>
            <label htmlFor="ImageDesc">Image description</label>
            <input type="text" name="ImageDesc"></input>
          </>
        )}

        <button type="submit">Post</button>
      </form>
    </main>
  );
};

export default ModPage;
