import logo from './logo.svg';
import './App.css';
import Landing from "./components/Landing";
import Upload from "./components/Upload";
import {useEffect, useState} from "react";
import AnalyzeCanvas from "./components/AnalyzeCanvas";
import CoordinatePicker from "./components/CoordinatePicker";
import axios from "axios";

function App() {
    const [upload, toggleUpload] = useState(false);
    const [stage, setStage] = useState(0);
    //0 is landing page, 1 is upload page, 2 is point page, 3 is analyze page

    useEffect(() => {
        console.log(stage);
    }, [stage]);

    const [file, setFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const onFileChange = async (e) => {
        const file = e.target.files[0];
        setFile(file);

        setPreviewUrl(URL.createObjectURL(file));
    };

    const onUpload = async (points) => {
        if (file == null) return;
        const formData = new FormData();
        formData.append('file', file);
        formData.append('points', points)

        try {
            const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Upload success:', response.data);
            setStage(3);
        } catch (error) {
            console.error('Upload error:', error);
        }
    }

    if (stage <= 1) {
        return (
            <div>
                <Landing toggleShow={toggleUpload} setStage={setStage}/>
                <Upload show={upload} toggleShow={toggleUpload} setStage={setStage} file={file} setFile={setFile} previewUrl={previewUrl} setPreviewUrl={setPreviewUrl} onFileChange={onFileChange}/>
            </div>
        )
    } else if (stage <= 2) {
        return <CoordinatePicker setStage={setStage} onUpload={onUpload} previewUrl={previewUrl}/>
    } else {
        return <AnalyzeCanvas previewUrl={previewUrl}/>
    }
}

export default App;
