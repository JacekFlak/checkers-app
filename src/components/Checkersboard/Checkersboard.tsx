import React from "react";
import Tile from "../Tile/Tile";
import "./Checkersboard.css";

const vertical = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontal = ["1", "2", "3", "4", "5", "6", "7", "8"];

interface Pawn {
  image: string;
  x: number;
  y: number;
}

const pawns: Pawn[] = [];

// TODO: use loop instead of static pushing pawns

pawns.push({ image: "assets/images/white_pawn.png", x: 1, y: 7 });
pawns.push({ image: "assets/images/white_pawn.png", x: 3, y: 7 });
pawns.push({ image: "assets/images/white_pawn.png", x: 5, y: 7 });
pawns.push({ image: "assets/images/white_pawn.png", x: 7, y: 7 });

pawns.push({ image: "assets/images/black_pawn.png", x: 0, y: 0 });
pawns.push({ image: "assets/images/black_pawn.png", x: 2, y: 0 });
pawns.push({ image: "assets/images/black_pawn.png", x: 4, y: 0 });
pawns.push({ image: "assets/images/black_pawn.png", x: 6, y: 0 });

export default function Checkersboard() {
  let board = [];

  for (let j = vertical.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontal.length; i++) {
      
      const number = j + i + 2;
      let image = undefined;

      pawns.forEach((p) => {
        if (p.x == i && p.y === j) {
          image = p.image;
        }
      });
      board.push(<Tile image={image} number={number} />);
    }
  }
  return <div id="checkersboard">{board}</div>;
}
