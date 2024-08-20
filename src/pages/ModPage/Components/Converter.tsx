import React, { useState, ChangeEvent } from 'react';
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

const Converter: React.FC<ConverterProps> = ({ inputData, handleEditorChange }) => {
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleConvert = async () => {
        if (!file) {
            alert("Please select a file first.");
            return;
        }

        try {
            const arrayBuffer = await file.arrayBuffer();
            const result = await mammoth.convertToHtml({ arrayBuffer });
            console.log("Conversion result:", result.value);
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
            <button onClick={handleConvert}>Convert</button>
        </div>
    );
}

export default Converter;