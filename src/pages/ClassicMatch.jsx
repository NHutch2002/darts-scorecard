import React from "react";
import { useLocation } from 'react-router-dom';


function calculateScore(scoreType, throwValue) {
    if (throwValue === 50) {
        return 50;
    } else if (throwValue === 25) {
        return 25;
    }   
    else if (throwValue === 0) {
        return 0;
    }
    else if (scoreType === 1) {
        return throwValue;
    } else if (scoreType === 2) {
        return throwValue * 2;
    } else {
        return throwValue * 3;
    }
}

function letterIndex(index) {
    let letter = index[0]

    if (index[1] == 50) {
        return "Bull"
    }
    else if (index[1] == 25) {
        return "25"
    }
    else if (index[1] == 0) {
        return "0"
    }
    else if (letter == 1) {
        return "" + index[1]
    }
    else if (letter == 2) {
        return "D" + index[1]
    }
    else if (letter == 3) {
        return "T" + index[1]
    }
}

const ClassicMatch = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const score = params.get('score');

    const [player1Score, setPlayer1Score] = React.useState(score);
    const [player2Score, setPlayer2Score] = React.useState(score);
    const [player1Throws, setPlayer1Throws] = React.useState([]);
    const [player2Throws, setPlayer2Throws] = React.useState([]);
    const [player1History, setPlayer1History] = React.useState([]);
    const [player2History, setPlayer2History] = React.useState([]);
    const [currentPlayer, setCurrentPlayer] = React.useState(1);
    const [currentGames, setCurrentGames] = React.useState({
        player1: 0,
        player2: 0,
        winner: null,
    });
    const [scoreType , setScoreType] = React.useState(1);

    if (player1Throws.length === 3) {
        let player1ThrowsTotal = 0
        for (let i = 0; i < player1Throws.length; i++) {
            player1ThrowsTotal += calculateScore(player1Throws[i][0], player1Throws[i][1]);
        }
        setPlayer1Score(player1Score - player1ThrowsTotal);
        setPlayer1Throws([]);
        setPlayer1History([...player1History, player1Throws]);
        setCurrentPlayer(2);
    }

    if (player2Throws.length === 3) {
        let player2ThrowsTotal = 0
        for (let i = 0; i < player2Throws.length; i++) {
            player2ThrowsTotal += calculateScore(player2Throws[i][0], player2Throws[i][1]);
        }
        setPlayer2Score(player2Score - player2ThrowsTotal);
        setPlayer2Throws([]);
        setPlayer2History([...player2History, player2Throws]);
        setCurrentPlayer(1);
    }

    function changeScoreType(type) {
        setScoreType(type);
        setTempScore([type, 0]);
    }

    function addScore(playerScore) {
        if (currentPlayer === 1) {
            if (playerScore === 50) {
                setPlayer1Throws([...player1Throws, [1, 50]]);
            } else if (playerScore === 25) {
                setPlayer1Throws([...player1Throws, [1, 25]]);
            } else if (playerScore === 0) {
                setPlayer1Throws([...player1Throws, [1, 0]]);
            } else {
                setPlayer1Throws([...player1Throws, [scoreType, playerScore]]);
            }
        } else {
            if (playerScore === 50) {
                setPlayer2Throws([...player2Throws, [1, 50]]);
            } else if (playerScore === 25) {
                setPlayer2Throws([...player2Throws, [1, 25]]);
            } else if (playerScore === 0) {
                setPlayer2Throws([...player2Throws, [1, 0]]);
            } else {
                setPlayer2Throws([...player2Throws, [scoreType, playerScore]]);
            }
        }
    }

    return (
        <div className="flex flex-col w-full h-dvh items-center">
            <div className="flex w-full">
                <div className={`flex flex-col justify-center items-center h-[130px] w-1/2 space-y-2 ${currentPlayer === 1 ? "bg-orange-500" : "bg-black"}`}>
                    <h1 className="text-slate-200 text-sm">Player 1</h1>
                    <h1 className="text-slate-200 text-6xl font-bold">{player1Score}</h1>
                </div>
                <div className={`flex flex-col justify-center items-center h-[130px] w-1/2 space-y-2 ${currentPlayer === 2 ? "bg-orange-500" : "bg-black"}`}>
                    <h1 className="text-slate-200 text-sm">Player 2</h1>
                    <h1 className="text-slate-200 text-6xl font-bold">{player2Score}</h1>
                </div>
            </div>
            <div className="flex justify-center w-full border-b border-slate-500">
                <div className="flex w-2/5 items-center h-full justify-center text-slate-200">
                    <p>No Checkout</p>
                </div>
                <div className="flex justify-center w-1/5 border-x border-slate-500">
                    <p className="text-slate-200 py-2">{currentGames.player1} - {currentGames.player2}</p>
                </div>
                <div className="flex w-2/5 items-center h-full justify-center text-slate-200">
                    <p className="bg-orange-500 px-3 py-1 rounded-lg">T20 - Bull - Bull</p>
                </div>
            </div>
            <div className="flex w-full h-full">
                <div className="flex flex-col w-1/2 h-full border-r border-slate-500 text-slate-200 items-center">
                    <ul className="p-4 space-y-2">
                        {player1History.map((throwValue, index) => (
                            <li key={index}>{letterIndex(throwValue[0])} - {letterIndex(throwValue[1])} - {letterIndex(throwValue[2])} = {calculateScore(throwValue[0][0], throwValue[0][1]) + calculateScore(throwValue[1][0], throwValue[1][1]) + calculateScore(throwValue[2][0], throwValue[2][1])}</li>
                        ))}
                    </ul>
                </div>
                <div className="flex flex-col w-1/2 h-full">
                    <ul>
                        {player2Throws.map((throwValue, index) => (
                            <li key={index}>{throwValue}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="w-full border-t border-slate-500">
                <div className="flex text-slate-200 text-3xl w-full items-center px-6 py-5 border-b border-slate-500">
                    <button className={`${scoreType === 1 ? "bg-zinc-700" : ""} w-1/3 py-1 rounded-lg`} onClick={() => changeScoreType(1)}>Single</button>
                    <button className={`${scoreType === 2 ? "bg-zinc-700" : ""} w-1/3 py-1 rounded-lg`} onClick={() => changeScoreType(2)}>Double</button>
                    <button className={`${scoreType === 3 ? "bg-zinc-700" : ""} w-1/3 py-1 rounded-lg`} onClick={() => changeScoreType(3)}>Triple</button>
                </div>
                <div className="flex w-full text-xl justify-between px-6 text-slate-200 py-5 border-b border-slate-500">
                    <button onClick={() => addScore(25)}>Outer Bull</button>
                    <button onClick={() => addScore(50)}>Inner Bull</button>
                    <button onClick={() => addScore(0)}className="text-center w-1/4">Miss</button>
                </div>
                <grid className="grid grid-cols-5 text-slate-200 w-full pt-5">
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(1)}>1</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(2)}>2</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(3)}>3</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(4)}>4</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(5)}>5</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(6)}>6</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(7)}>7</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(8)}>8</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(9)}>9</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(10)}>10</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(11)}>11</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(12)}>12</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(13)}>13</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(14)}>14</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(15)}>15</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(16)}>16</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(17)}>17</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(18)}>18</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(19)}>19</button>
                    <button className="flex justify-center text-xl h-[50px] font-bold" onClick={() => addScore(20)}>20</button>
                </grid>
            </div>
        </div>
    );
}

export default ClassicMatch;