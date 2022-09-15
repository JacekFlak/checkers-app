import React, { useRef } from "react";
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

for (let i = 1; i < 8; i += 2) {
  pawns.push({ image: "assets/images/white_pawn.png", x: i, y: 7 });
  pawns.push({ image: "assets/images/white_pawn.png", x: i - 1, y: 6 });
  pawns.push({ image: "assets/images/white_pawn.png", x: i, y: 5 });

  pawns.push({ image: "assets/images/black_pawn.png", x: i - 1, y: 2 });
  pawns.push({ image: "assets/images/black_pawn.png", x: i, y: 1 });
  pawns.push({ image: "assets/images/black_pawn.png", x: i - 1, y: 0 });
}

export default function Checkersboard() {
  const checkersBoardRef = useRef<HTMLDivElement>(null);

  let activePiece: HTMLElement | null = null;

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;

    if (element.classList.contains("chess-piece")) {
      console.log(e.target);
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.position = "absolute";
      activePiece = element;
    }
  }

  function movePiece(e: React.MouseEvent) {
    const checkersboard = checkersBoardRef.current;
    if (activePiece && checkersboard) {
      const minX = checkersboard.offsetLeft - 25;
      const minY = checkersboard.offsetTop - 25;
      const maxX = checkersboard.offsetLeft + checkersboard.clientWidth - 75;
      const maxY = checkersboard.offsetTop + checkersboard.clientHeight - 75;
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      activePiece.style.position = "absolute";

      if (x < minX) {
        activePiece.style.left = `${minX}px`;
      } else if (x > maxX) {
        activePiece.style.left = `${maxX}px`;
      } else {
        activePiece.style.left = `${x}px`;
      }

      if (y < minY) {
        activePiece.style.top = `${minY}px`;
      } else if (y > maxY) {
        activePiece.style.top = `${maxY}px`;
      } else {
        activePiece.style.top = `${y}px`;
      }
    }
  }

  function dropPiece(e: React.MouseEvent) {
    if (activePiece) {
      activePiece = null;
    }
  }

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
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onPointerDown={(e) => grabPiece(e)}
      onPointerUp={(e) => dropPiece(e)}
      id="checkersboard"
      ref={checkersBoardRef}
    >
      {board}
    </div>
  );
}
