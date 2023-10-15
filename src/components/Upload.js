import axios from "axios";
import {useState} from "react";
import {FaArrowRight, FaRotateRight, FaX, FaXmark} from "react-icons/fa6";
import {FaWindowClose} from "react-icons/fa";

export default function Upload({show, toggleShow, setStage, file, setFile, previewUrl, setPreviewUrl, onFileChange}) {

    const toggleVisibility = () => {
        toggleShow(!show);
    }

    if (show) {
        return (
            <div className="absolute top-0 left-0 h-screen w-screen bg-black bg-opacity-50 grid">
                <div
                    className="relative grid h-auto w-auto place-self-center bg-white rounded-xl border-2 border-gray p-8">
                    <div className="relative w-[640px] aspect-video border-dashed border-8 p-2">
                        {previewUrl && (
                            <div className={"relative"}>
                                <video className={"robject-center"} controls>
                                    <source src={previewUrl} type="video/mp4"/>
                                    Your browser does not support the video tag.
                                </video>
                                <button
                                    onClick={() => {
                                        setPreviewUrl(null);
                                        setFile(null);
                                    }}
                                    className={"grid place-items-center w-8 h-8 bg-green-500 rounded-full absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 hover:bg-green-600"}>
                                    <FaRotateRight/>
                                </button>
                            </div>
                        )}
                        {!previewUrl && (
                            <div className={"relative w-full h-full"}>
                                <input className="h-full w-full opacity-0" type="file" accept="video/*"
                                       onChange={onFileChange}/>
                                <div className={"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"}>
                                    <p className={"text-xl text-gray-500 select-none"}>
                                        Upload a video
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <button onClick={() => {
                        if (file == null) return;
                        setStage(2);
                    }}
                            className={"hover:bg-blue-500 grid place-items-center rounded-full bg-blue-400 w-24 h-24 absolute top-1/2 right-0 origin-center translate-x-1/2 -translate-y-1/2"}>
                        <FaArrowRight size={28}/>
                    </button>
                    <button
                        onClick={() => {
                            setFile(null);
                            setPreviewUrl(null);
                            toggleVisibility();
                            setStage(0);
                        }}
                        className={"hover:bg-red-500 grid place-items-center rounded-full bg-red-400 w-12 h-12 absolute top-0 right-0 origin-center translate-x-1/2 -translate-y-1/2"}>
                        <FaXmark size={28}/>
                    </button>
                </div>
            </div>
        );
    }
}