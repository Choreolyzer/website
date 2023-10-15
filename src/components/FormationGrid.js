import {useState} from "react";

export default function FormationGrid() {
    const [step, setStep] = useState(50);
    const getRow = (vPos) => {
        return (
            <div className={`absolute h-[1px] bg-gray-400 w-screen`}
                    style={{top: `${vPos}px`}}></div>
        )
    }
    const getCol = (hPos) => {
        return (
            <div className={`absolute w-[1px] bg-gray-400 h-screen`}
                style={{left: `${hPos}px`}}></div>
        )
    }

    const rows = [];
    const cols = [];

    for(let i = 0; i <= 10000; i += step) {
        cols.push(getCol(i));
    }
    for(let i = 0; i <= 10000; i += step) {
        rows.push(getRow(i));
    }

    return (
        <div className={"absolute overflow-hidden w-full h-full"}>
            {rows}
            {cols}
        </div>
    )

}