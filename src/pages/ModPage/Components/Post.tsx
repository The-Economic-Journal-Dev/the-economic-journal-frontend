import React, {ChangeEvent, FormEvent, useEffect, useState} from "react";
import ReactQuill, {Quill} from "react-quill";
import "react-quill/dist/quill.snow.css";
import style from "./Post.module.css";
import Converter from "./Converter";
import {auth} from "../../../firebase";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {ImageDrop} from 'quill-image-drop-module'
import ImageResize from 'quill-resize-image';
import axios from "axios";
import LoadingBar from "./LoadingBar.tsx";
import Article from "../../Article/Article.tsx";

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

interface InputData {
    title: string;
    summary: string;
    metaTitle: string;
    articleBody: string;
    authorName: string;
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
    const [isUploading, SetIsUploading] = useState<boolean>(false)
    const [percentageCompleted, SetPercentageCompleted] = useState<number>(0)
    const [loadingDescription, SetLoadingDescription] = useState<string>("Appending initial data...")
    const [isPreviewVisible, setIsPreviewVisible] = useState(false);

    const handlePreview = (): void => {
        setIsPreviewVisible(true); // Show the preview overlay
    };

    const handleClosePreview = (): void => {
        setIsPreviewVisible(false); // Close the preview overlay
    };

    const [targetPage, setTargetPage] = useState(() => {
        return localStorage.getItem("targetPage") || "";
    });

    const [inputData, setInputData] = useState<InputData>(() => {
        const savedData = localStorage.getItem("articleData");
        return savedData
            ? JSON.parse(savedData)
            : {
                title: "",
                summary: "",
                metaTitle: "",
                articleBody: "",
                authorName: ""
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

    const handleWebsiteChange = (option: string) => {
        setTargetPage(option);
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
    /**
     * Uploads an image file from a FormData file to the bucket and returns the image URL.
     *
     * @param {File} file - The image file to upload.
     * @returns {Promise<string | undefined>} The URL of the uploaded image or undefined if an error occurs.
     * @throws Will throw an error if the image upload fails.
     */
    const uploadToBucketFromFile = async (file: File): Promise<string> => {
        // Extract MIME type
        const mimeType = file.type;

        let url: string;
        let key: string;
        try {
            const response = await axios.post("https://api.theeconomicjournal.org/upload", {
                mimeType,
                prefix: "article-image-banner"
            }, {
                headers: {
                    "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}`
                }
            });
            url = response.data.url;
            key = response.data.key;
        } catch (error) {
            console.error("Error uploading file to Bucket");
            throw error;
        }

        try {
            await axios.put(url, file, {
                headers: {
                    'Content-Type': mimeType,
                },
            });

            return `https://images.theeconomicjournal.org/${key}`;
        } catch (error) {
            throw new Error("Image upload failed");
        }
    };

    /**
     * Uploads a Base64 image and returns the URL.
     * @param src - The full Base64 data of the image taken from the src tag.
     * @returns The URL of the uploaded image.
     */
    const uploadToBucketFromSrc = async (src: string): Promise<string | undefined> => {
        // Extract MIME type and Base64 data from the src string
        const [metadata, base64Data] = src.split(',');
        const mimeType = metadata.split(':')[1].split(';')[0];

        const sliceSize = 512
        // Decode Base64 data
        const binaryString = atob(base64Data);
        const byteArrays = [];
        for (let offset = 0; offset < binaryString.length; offset += sliceSize) {
            const slice = binaryString.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }

        // Create Blob from ArrayBuffer
        const blob = new Blob(byteArrays, {type: mimeType});
        console.log(blob)

        let url: string;
        let key: string;
        try {
            const response = await axios.post("https://api.theeconomicjournal.org/upload", {
                mimeType,
                prefix: "article-image"
            }, {
                headers: {
                    "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}`
                }
            });

            url = response.data.url;
            key = response.data.key;
        } catch (error) {
            console.error("Error requesting upload URL from the server");
            console.error(error);
            return undefined;
        }

        try {
            await axios.put(url, blob, {
                headers: {
                    'Content-Type': mimeType,
                }
            });

            return `https://images.theeconomicjournal.org/${key}`;
        } catch (error) {
            console.error("Error uploading file to the S3 bucket");
            console.error(error);
            throw new Error("Image upload failed");
        }
    };

    async function deleteFromBucket(key: string) {
        try {
            const response = await axios.delete("https://api.theeconomicjournal.org/upload", {
                headers: {
                    "Authorization": `Bearer ${await auth.currentUser?.getIdToken()}`,
                },
                params: {key},
            });
            console.log(`Deleting file ${key}, ${response.data}`)
        } catch (error) {
            console.error("Error deleting file from Bucket")
            console.error(error)
            return undefined;
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        SetPercentageCompleted(0)
        SetIsUploading(true)

        const formData = new FormData();
        formData.append("title", inputData.title);
        formData.append("summary", inputData.summary);
        formData.append("metaTitle", inputData.metaTitle);
        formData.append("authorName", inputData.authorName);

        SetPercentageCompleted(10)
        SetLoadingDescription(`Appending Initial Data...`)
        // Intercept and process the articleBody to handle Base64 images
        const parser = new DOMParser();
        const doc = parser.parseFromString(inputData.articleBody, "text/html");
        const imgElements = doc.querySelectorAll("img");

        const uploadedImageKeys: string[] = []; // To store keys of successfully uploaded images
        let processedCount = 0;
        try {
            for (const img of imgElements) {
                const src = img.getAttribute("src");
                if (src && src.startsWith("data:image/")) {
                    // Upload the Base64 image and replace the src with the URL
                    const url = await uploadToBucketFromSrc(src);
                    if (url) {
                        img.setAttribute("src", url);
                        img.setAttribute("loading", 'lazy');
                        img.setAttribute('referrerPolicy', 'no-referrer');
                        // Extract the key from the URL and store it
                        const key = url.split("/").pop();
                        if (key) {
                            uploadedImageKeys.push(key);
                        }

                        // Update the processed count and calculate the percentage
                        processedCount++;
                        const percentageCompleted = (processedCount / imgElements.length) * 60;
                        SetPercentageCompleted(percentageCompleted + 10)
                        SetLoadingDescription(`Uploaded ${processedCount} Images(s)...`)
                    } else {
                        throw new Error("Image upload failed");
                    }
                }
            }

            // Serialize the modified HTML back to a string
            const modifiedArticleBody = doc.body.innerHTML;
            formData.append("articleBody", modifiedArticleBody);
            formData.append("category", toTitleCase(targetPage));
            formData.append("position", "1");

            SetPercentageCompleted(80)
            SetLoadingDescription(`Appending Additional Data...`)

            if (!imageFile) {
                throw new Error("No Banner Image");
            }

            const imageUrl = await uploadToBucketFromFile(imageFile);
            if (imageUrl) {
                // Store the banner image key for cleanup in case of failure
                const bannerImageKey = imageUrl.split("/").pop();
                if (bannerImageKey) {
                    uploadedImageKeys.push(bannerImageKey);
                }
                formData.append("imageUrl", imageUrl);
            } else {
                throw new Error("Banner image upload failed");
            }
            SetPercentageCompleted(90)
            SetLoadingDescription(`Uploaded Banner Image...`)
            console.log(modifiedArticleBody)

            await postData(formData);
            SetPercentageCompleted(100)
            SetLoadingDescription("Article Posted!")
        } catch (error) {
            console.error(error);
            setError((error as Error).message || "An error occurred");

            // Cleanup: delete uploaded images if there's an error
            for (const key of uploadedImageKeys) {
                try {
                    await deleteFromBucket(key); // You will need to implement this function
                } catch (cleanupError) {
                    console.error(`Failed to delete image with key ${key}:`, cleanupError);
                }
            }
        }
    };

    const previewArticle: IArticleData = {
        articleBody: inputData.articleBody,
        authorUid: "",
        category: targetPage,
        datePublished: new Date(),
        imageUrl: "",
        lastUpdated: new Date(),
        likesCount: 0,
        metaTitle: inputData.metaTitle,
        position: 0,
        summary: inputData.summary,
        title: inputData.title

    }

    const modules = {
        toolbar: {
            container: [
                [{'header': [1, 2, 3, 4, 5, 6, false]}, {'font': []}],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'},
                    {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean'],
                [{'align': []}],
            ],
        },
        clipboard: {
            matchVisual: false,
        },
        imageDrop: true,
        imageResize: {
            parchment: Quill.import('parchment'),
            modules: ['Resize', 'DisplaySize']
        }
    }

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
                    placeholder="Summarise your title in just a few words"
                    value={inputData.metaTitle}
                    onChange={handleInput}
                />

                <label htmlFor="authorname">Author Name</label>
                <input
                    type="text"
                    name="authorName"
                    placeholder="Name of the author (leave blank if current user)"
                    value={inputData.authorName}
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
                    modules={modules}
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

                {posted && <h5 style={{color: "green"}}>Posted Successfully</h5>}

                {isUploading && <LoadingBar percentage={percentageCompleted} description={loadingDescription}
                                            errorDescription={error}/>}

                <div>
                    {/* Button to trigger the preview */}
                    <button type="button" onClick={handlePreview}>
                        Preview Post
                    </button>
                </div>

                <button type="submit">Post</button>
            </form>

            {/* Conditional Rendering of Preview Overlay */}
            {isPreviewVisible && (
                <div className={style.previewOverlay}>
                    <div className={style.previewContent}>
                        <button onClick={handleClosePreview} className={style.closeButton}>
                            Close Preview
                        </button>
                        <Article previewArticle={previewArticle}/>
                    </div>
                </div>
            )}
        </>
    );
};

export default Post;
