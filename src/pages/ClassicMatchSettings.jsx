import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ClassicMatchSettings = () => {

    const [scoreIndex, setScoreIndex] = useState(2);

    const scores = [101, 201, 301, 501, 701];

    return (
        <div className="flex flex-col p-10 items-center justify-center h-full w-full">
            <div className="flex flex-col items-center bg-orange-500 w-full py-10 rounded-3xl">
                <div className="w-5/6">
                    <Link to="/">
                        <button className="bg-orange-500 p-2 rounded-lg text-slate-200 underline underline-offset-4 bg-orange-600">{"< Back to Home"}</button>
                    </Link>
                </div>
                <h1 className="p-14 text-3xl font-bold text-slate-200">{scores[scoreIndex]}</h1>
                <div className="flex space-x-2">
                    {scores.map((score, index) => (
                        <button
                            key={index}
                            onClick={() => setScoreIndex(index)}
                            className={`px-3 py-2 rounded-lg ${scoreIndex === index ? 'bg-orange-600' : 'bg-orange-500'} text-slate-200`}
                        >
                            {score}
                        </button>
                    ))
                    }
                </div>
                <Link to={`/classic-match?score=${scores[scoreIndex]}`}>
                    <button className="bg-slate-200 p-2 rounded-lg text-zinc-900 mt-10">Start Game</button>
                </Link>
            </div>            
        </div>
    );
}
    
export default ClassicMatchSettings;