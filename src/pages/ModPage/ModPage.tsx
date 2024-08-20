import { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import Post from "./Components/Post";
import OptionSelector from "./Components/OptionSelector";
import style from "./ModPage.module.css";
import Delete from "./Components/Delete";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { auth } from "../../firebase"
import NotFound from "../Errors/NotFound";



const ModPage = () => {
  const options = ["Post", "Delete"];
  const [optionChose, setOptionChose] = useState("Post");
  const [hasPermission, setHasPermission] = useState<Boolean>(false);

  const optionPressed = (option: string) => {
    setOptionChose(option);
  }

  useEffect(()=>{
    const CheckPermission = async () => {
      const idToken = await auth.currentUser?.getIdTokenResult()

      if (!idToken) return setHasPermission(false);

      if (["writer", "admin"].includes((idToken.claims.role) as string)) {
        setHasPermission(true);
      } else {
        setHasPermission(false);
      }
    }

    CheckPermission()
  });

  if (!hasPermission) {
    return (
      <NotFound />
    );
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
