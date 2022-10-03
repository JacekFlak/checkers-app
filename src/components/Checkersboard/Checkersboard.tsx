import React, { useEffect, useRef, useState } from "react";
import Tile from "../Tile/Tile";
import "./Checkersboard.css";
import { Piece } from "../../Constants";

const vertical = ["1", "2", "3", "4", "5", "6", "7", "8"];
const horizontal = ["1", "2", "3", "4", "5", "6", "7", "8"];

const initialBoardState: Piece[] = [];

for (let i = 1; i < 8; i += 2) {
  initialBoardState.push({ image: "assets/images/white_pawn.png", x: i, y: 7 });
  initialBoardState.push({
    image: "assets/images/white_pawn.png",
    x: i - 1,
    y: 6,
  });
  initialBoardState.push({ image: "assets/images/white_pawn.png", x: i, y: 5 });

  initialBoardState.push({
    image: "assets/images/black_pawn.png",
    x: i - 1,
    y: 2,
  });
  initialBoardState.push({ image: "assets/images/black_pawn.png", x: i, y: 1 });
  initialBoardState.push({
    image: "assets/images/black_pawn.png",
    x: i - 1,
    y: 0,
  });
}

export default function Checkersboard() {
  const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
  const [gridX, setGridX] = useState(0);
  const [gridY, setGridY] = useState(0);
  const [pieces, setPieces] = useState<Piece[]>(initialBoardState);
  const checkersBoardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {}, []);

  function grabPiece(e: React.MouseEvent) {
    const element = e.target as HTMLElement;
    const checkersboard = checkersBoardRef.current;
    if (element.classList.contains("chess-piece") && checkersboard) {
      //console.log(e.target);
      setGridX(Math.floor((e.clientX - checkersboard.offsetLeft) / 100)); //najwieksza liczba calkowita mniejszą lub równą 
      setGridY(Math.abs(Math.ceil((e.clientY - checkersboard.offsetTop - 800) / 100))); //wartosc bezwzdgledna liczby
      const x = e.clientX - 50;
      const y = e.clientY - 50;
      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.position = "absolute";
      setActivePiece(element);
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

      // switch (x.valueOf) {
      //   case x.valueOf<minX:
      //     activePiece.style.left = `${minX}px`;
      //     break;
      //     case 2:
      // } //redukcja ifów

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
    const checkersboard = checkersBoardRef.current;
    if (activePiece && checkersboard) {
      const x = Math.floor((e.clientX - checkersboard.offsetLeft) / 100);
      const y = Math.abs(
        Math.ceil((e.clientY - checkersboard.offsetTop - 800) / 100)
      );
      console.log(x, y);
      setPieces((value) => {
        const pieces = value.map((p) => {
          if (p.x === gridX && p.y === gridY) {
            p.x = x;
            p.y = y;
          }
          return p;
        });
        return pieces;
      });

      setActivePiece(null);
    }
  }

  let board = [];

  for (let j = vertical.length - 1; j >= 0; j--) {
    for (let i = 0; i < horizontal.length; i++) {
      const number = j + i + 2;
      let image = undefined;

      initialBoardState.forEach((p) => {
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
