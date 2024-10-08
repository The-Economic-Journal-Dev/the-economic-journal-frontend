import {useEffect, useState} from "react";
import "react-quill/dist/quill.snow.css";
import Post from "./Components/Post";
import OptionSelector from "./Components/OptionSelector";
import style from "./ModPage.module.css";
import Delete from "./Components/Delete";
import {Helmet, HelmetProvider} from "react-helmet-async";
import {auth} from "../../firebase";
import NotFound from "../Errors/NotFound";

const ModPage = () => {
    const options = ["Post", "Delete"];
    const [optionChose, setOptionChose] = useState("Post");
    const [hasPermission, setHasPermission] = useState<boolean>(false);

    const optionPressed = (option: string) => {
        setOptionChose(option);
    };

    useEffect(() => {
        const CheckPermission = async () => {
            const idToken = await auth.currentUser?.getIdTokenResult();

            if (!idToken) return setHasPermission(false);

            if (["writer", "admin"].includes((idToken.claims.role) as string)) {
                setHasPermission(true);
            } else {
                setHasPermission(false);
            }
        };

        CheckPermission();
    }, []);

    if (!hasPermission) {
        return <NotFound/>;
    }

    return (
        <main className={style.modForm}>
            <HelmetProvider>
                <Helmet>
                    <title>Modpage</title>
                    <meta name="robots" content="follow, noarchive, noindex"/>
                </Helmet>
            </HelmetProvider>

            <div className={style.optionSelectorWrap}>
                <OptionSelector
                    options={options}
                    optionChose={optionChose}
                    optionPressed={optionPressed}
                />
            </div>

            <div className={style.contentWrap}>
                {optionChose === "Post" && <Post/>}
                {optionChose === "Delete" && <Delete/>}
            </div>
        </main>
    );
};

export default ModPage;
