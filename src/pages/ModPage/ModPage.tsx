import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useQuill } from "react-quilljs";
import "react-quill/dist/quill.snow.css";
import Soft404 from "../../components/Head/soft-404";
import Post from "./Components/Post";
import OptionSelector from "./Components/OptionSelector";
import style from "./ModPage.module.css";
import Delete from "./Components/Delete";



const ModPage = () => {
  const options = ["Post", "Delete"];
  const [optionChose, setOptionChose] = useState("Post");

  const optionPressed = (option: string) => {
    setOptionChose(option);
  }

  return (
    <main className={style.modForm}>
      <OptionSelector options={options}
          optionChose={optionChose}
          optionPressed={optionPressed}/>

      {optionChose == "Post" && (
          <Post />
        )}
      
      {optionChose == "Delete" && (
          <Delete />
        )}
    </main>
    </>
    
  );
}


export default ModPage;
