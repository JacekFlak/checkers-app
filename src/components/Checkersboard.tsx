import React from "react";

import "./Checkersboard.css";

const vertical = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontal = ["1", "2", "3", "4", "5", "6", "7", "8"];

export default function Checkersboard() {
    
    let board = [];

    for (let j = vertical.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontal.length; i++) {
            const number = j + i + 2;

            if (number % 2 === 0) {
                board.push(
                    <div className="tile black-tile"></div>
                );
            } else {
                board.push(
                    <div className="tile white-tile"></div>
                );
            }
        }
    }

    return <div id="checkersboard">{board}</div>;
}