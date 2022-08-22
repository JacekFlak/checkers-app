import "./Tile.css";

interface Props {
  image?: string;
  number: number;
}

export default function Tile({ number, image }: Props) {
  if (number % 2 === 0) {
    return (
      <div className="tile grey-tile">
        <img src={image} />
      </div>
    );
  } else {
    return (
      <div className="tile red-tile">
        <img src={image} />
      </div>
    );
  }
}

//The Tile component is very flexible and allows you to manipulate its rendering
