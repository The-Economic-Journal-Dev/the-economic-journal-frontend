import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import Post from "./Components/Post";
import OptionSelector from "./Components/OptionSelector";
import style from "./ModPage.module.css";
import Delete from "./Components/Delete";
import { Helmet, HelmetProvider } from "react-helmet-async";



const ModPage = () => {
  const options = ["Post", "Delete"];
  const [optionChose, setOptionChose] = useState("Post");

  const optionPressed = (option: string) => {
    setOptionChose(option);
  }

  return (
    <main className={style.modForm}>
      <HelmetProvider>
        <Helmet>
          <title>Modpage</title>
          <meta name="robots" content="follow, noarchive, noindex" />
        </Helmet>
      </HelmetProvider>
    
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
    
  );
}


export default ModPage;
