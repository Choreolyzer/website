import {FaPause, FaPlay} from "react-icons/fa6";
import {Fragment} from "react";

export default function AnalyzeControls({playing, togglePlaying, time, setTime, duration, setDuration, player, visualizer}) {

    const toHHMMSS = (time_sec) => {
        return new Date(1000 * time_sec).toISOString().substr(14, 5);
    }

    const handleClick = (e) => {
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const clickedPosition = x / rect.width;
        const newTime = clickedPosition * duration;
        player.current.currentTime = newTime;
        visualizer.current.currentTime = newTime;
    }

    return (
        <Fragment>
            <div className={"w-1/6 flex justify-start gap-2 px-4 py-2 min-w-[250px]"}>
                <div onClick={() => togglePlaying(!playing)}>
                    {!playing ? <FaPlay size={24}/> : <FaPause size={24}/>}
                </div>
                <div className={"w-1/2"}>
                    <p>{toHHMMSS(time)} / {toHHMMSS(duration)}</p>
                </div>
            </div>
            <div
                onClick={handleClick}
                className={"w-full h-full grid place-items-center"}>
                <div className={"relative flex justify-start w-full h-3 pointer-events-none"}>
                    <div className={"w-full h-full bg-black overflow-hidden rounded-full"}>
                        <div className={"h-full bg-red-500"}
                             style={{width: `${time/duration * 100}%`}}></div>
                    </div>
                </div>
            </div>
            <div className={"w-1/6 flex justify-end min-w-[250px]"}>
                <p>time: {time}</p>
                <p>duration: {duration}</p>
            </div>
        </Fragment>
    )
}