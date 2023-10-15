import FormationVisualizer from "./FormationVisualizer";
import {Fragment, useEffect, useRef, useState} from "react";
import {FaPause, FaPlay} from "react-icons/fa6";
import AnalyzeControls from "./AnalyzeControls";


export default function AnalyzeCanvas({previewUrl}) {
    const [time, setTime] = useState(0);
    const [duration, setDuration] = useState(60);
    const [playing, togglePlaying] = useState(false);

    const player = useRef();
    const visualizer = useRef();
    const birdeye = useRef();


    const poll = async () => {
        //polls for most recently generated yolox image
    }

    useEffect(() => {
        if (player && player.current && visualizer && visualizer.current && birdeye && birdeye.current) {
            player.current.addEventListener("timeupdate", () => {
                setTime(player.current.currentTime);
            })
            player.current.addEventListener("loadedmetadata", () => {
                setDuration(player.current.duration);
            })
            if (playing) {
                player.current.play();
                visualizer.current.play();
                birdeye.current.play();
            } else {
                setTime(player.current.currentTime);
                player.current.pause();
                visualizer.current.pause();
                visualizer.current.currentTime = time;
                birdeye.current.pause();
                birdeye.current.currentTime = time;
            }
        }
    }, [player, visualizer, playing, time]);


    return (
        <Fragment>
            <div className={"relative grid grid-rows-2 grid-cols-2 h-[96dvh] w-screen place-items-center"}>
                <div className={"absolute top-0 left-0 h-full w-full"}>
                    <FormationVisualizer/>
                </div>

                <div
                    onClick={() => {
                        togglePlaying(!playing);
                    }}
                    className={"bg-black h-full aspect-video grid-cols-1 z-10 overflow-hidden"}>
                    <video className={"w-full h-full"}
                           ref={player}
                           src={previewUrl} />
                </div>
                <div className={"bg-black w-full aspect-video row-span-2"}>
                    <video className={"w-full h-full"}
                           ref={birdeye}
                           src={'http://127.0.0.1:5000/birdeye.webm'} />
                </div>
                <div className={"bg-black h-full aspect-video z-10 overflow-hidden"}>
                    <video className={"w-full h-full"}
                           ref={visualizer}
                           src={'http://127.0.0.1:5000/out.webm'} />
                </div>
            </div>
            <div className={"select-none relative flex h-[4dvh] w-screen bg-slate-300 place-items-center justify-between border-t-2 border-slate-500"}>
                <AnalyzeControls
                    duration={duration}
                    setDuration={setDuration}
                    playing={playing}
                    togglePlaying={togglePlaying}
                    time={time}
                    setTime={setTime}
                    player={player}
                    visualizer={visualizer}
                />
            </div>
        </Fragment>
    )
}