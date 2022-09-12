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

for (let i = 1; i < 8; i += 2) {
  pawns.push({ image: "assets/images/white_pawn.png", x: i, y: 7 });
  pawns.push({ image: "assets/images/white_pawn.png", x: i - 1, y: 6 });
  pawns.push({ image: "assets/images/white_pawn.png", x: i, y: 5 });

  pawns.push({ image: "assets/images/black_pawn.png", x: i - 1, y: 2 });
  pawns.push({ image: "assets/images/black_pawn.png", x: i, y: 1 });
  pawns.push({ image: "assets/images/black_pawn.png", x: i - 1, y: 0 });
}

// funkcja do generacji graczy i tworzenie dla nich pionków
// ruch
// klasa z pozycjami gracza, tak zeby potem przepisac
// klasa/component do pilnowania zasad gry

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
  if (activePiece && activePiece.classList.contains("chess-piece")) {
    const x = e.clientX - 50;
    const y = e.clientY - 50;
    activePiece.style.left = `${x}px`;
    activePiece.style.top = `${y}px`;
    activePiece.style.position = "absolute";
  }
}

function dropPiece(e: React.MouseEvent) {
  if (activePiece) {
    activePiece = null;
  }
}

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
  return (
    <div
      onMouseMove={(e) => movePiece(e)}
      onPointerDown={(e) => grabPiece(e)}
      onPointerUp={(e) => dropPiece(e)}
      id="checkersboard"
    >
      {board}
    </div>
  );
}
