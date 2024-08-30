import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./Post.module.css";
import Converter from "./Converter";
import {auth} from "../../../firebase";

interface InputData {
    title: string;
    summary: string;
    metaTitle: string;
    articleBody: string;
}

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

export const PostSelector = ({
                                 selectedWebsite,
                                 onWebsiteChange,
                             }: {
    selectedWebsite: string;
    onWebsiteChange: (value: string) => void;
}) => {
    return (
        <div className={style.postSelector}>
            <WebsiteSelector
                selectedValue={selectedWebsite}
                onSelectChange={onWebsiteChange}
            />
        </div>
    );
};

function toTitleCase(str: string) {
    return str.replace(
        /\w\S*/g,
        (text) => text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
    );
}

const Post = () => {
    const [targetPage, setTargetPage] = useState(() => {
        return localStorage.getItem("targetPage") || "";
    });
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

    const handleEditorChange = (value: string) => {
        setInputData((prevState) => ({
            ...prevState,
            articleBody: value,
        }));
    };

    const dynamicInputs = (pageOption: string) => {
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

        dynamicInputs(option);
    };

    const handleInput = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {name, value} = event.target;
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
            console.log(myPostData)

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
        } catch (error) {
            console.log(error);
            throw error;
        }
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", inputData.title);
        formData.append("summary", inputData.summary);
        formData.append("metaTitle", inputData.metaTitle);
        formData.append("articleBody", inputData.articleBody);
        formData.append("category", toTitleCase(targetPage));
        formData.append("position", "1");
        if (hasImage) {
            if (imageFile) {
                console.log("Image detected")
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
                    onWebsiteChange={handleWebsiteChange}
                />

                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    value={inputData.title}
                    onChange={handleInput}
                />

                <label htmlFor="summary">Summary</label>
                <textarea
                    id="summary"
                    name="summary"
                    className={style.wrappedInput}
                    onChange={handleInput}
                    value={inputData.summary}
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
                <ReactQuill
                    theme="snow"
                    value={inputData.articleBody}
                    onChange={handleEditorChange}
                />

                <>
                    <label htmlFor="Image">Image</label>
                    <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleImageInput}
                    ></input>
                </>

                {error != "" && <h5 style={{color: "red"}}>{error}</h5>}
                {posted && <h5 style={{color: "green"}}>Posted Successfully</h5>}

                <button type="submit">Post</button>
            </form>
        </>
    );
};

export default Post;
