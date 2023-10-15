import {useState} from "react";
import {FaArrowRight, FaRotateRight, FaXmark} from "react-icons/fa6";
import {FaArrowLeft} from "react-icons/fa";

export default function CoordinatePicker({setStage, onUpload, previewUrl}) {
    const [points, setPoints] = useState([]);
    const [pointCount, setPointCount] = useState(1);
    const [pointData, setPointData] = useState([]);

    const handlePointClick = (e) => {
        if (pointCount > 4) {
            return;
        }
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX / rect.width * 1920;
        const y = e.clientY / rect.height * 1080;
        setPointCount(pointCount + 1);
        setPoints(prevPoints => [...prevPoints, <div className={"grid -translate-x-1/2 -translate-y-1/2 place-items-center absolute rounded-full h-8 w-8 bg-red-500"} style={{top: e.clientY + "px", left: e.clientX + "px"}}>{pointCount}</div>])
        setPointData(prevPoints => [...prevPoints, [x, y]])
    }

    const resetPoints = () => {
        setPointCount(1);
        setPointData([]);
        setPoints([]);
    }

    return (
        <div className={"w-screen h-screen relative bg-black"}>
            <video
                onClick={handlePointClick}
                className={"w-full h-full aspect-video"}
                src={previewUrl}
            />
            {points}
            {pointCount > 1 &&
                <div
                    onClick={resetPoints}
                    className={"grid place-items-center absolute bottom-16 left-1/2 rounded-full bg-yellow-400 hover:bg-yellow-500 w-24 h-24 -translate-x-1/2"}>
                    <FaRotateRight size={28}/>
                </div>
            }
            {pointCount === 5 &&
                <div
                    onClick={() => {
                        onUpload(pointData)
                    }}
                    className={"grid place-items-center absolute right-16 top-1/2 rounded-full bg-green-400 hover:bg-green-500 w-24 h-24"}>
                    <FaArrowRight size={28}/>
                </div>
            }
            <div
                onClick={() => {
                    setStage(1);
                }}
                className={"grid place-items-center absolute left-16 top-1/2 rounded-full bg-red-400 hover:bg-red-500 w-24 h-24"}>
                <FaXmark size={28}/>
            </div>
        </div>
    )
}