import React, {ChangeEvent, useState} from 'react';
import * as mammoth from "mammoth";

interface InputData {
    title: string;
    summary: string;
    metaTitle: string;
    articleBody: string;
}

interface ConverterProps {
    inputData: InputData;
    handleEditorChange: (value: string) => void;
}

const Converter: React.FC<ConverterProps> = ({inputData, handleEditorChange}) => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState("");

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleImageError = () => {
        setError("No Images Allowed. Ignoring images...");
        setTimeout(() => {
            setError("")
        }, 2000)
    }

    const options = {
        ignoreEmptyParagraphs: true,
    };

    const handleAppend = async (event: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent default behavior
        event.preventDefault();

        if (!file) {
            alert("Please select a file first.");
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.convertToHtml({arrayBuffer}, options)

            console.log("Conversion result:", result.value);
            // Update the articleBody with the converted HTML
            handleEditorChange(inputData.articleBody + result.value);
        } catch (error) {
            console.error("Conversion error:", error);
            alert("An error occurred during conversion.");
        }
    };

    const handleOverwrite = async (event: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent default behavior
        event.preventDefault();

        if (!file) {
            alert("Please select a file first.");
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.convertToHtml({arrayBuffer}, options);
            // Update the articleBody with the converted HTML
            handleEditorChange(result.value);
        } catch (error) {
            console.error("Conversion error:", error);
            alert("An error occurred during conversion.");
        }
    };

    return (
        <div>
            <input
                type="file"
                accept=".docx"
                onChange={handleFileChange}
            />
            <button onClick={handleAppend}>Append</button>
            <button onClick={handleOverwrite}>Overwrite</button>

            {error ? <p>{error}</p> : <></>}
        </div>
    );
}

export default Converter;