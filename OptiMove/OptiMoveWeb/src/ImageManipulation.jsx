import React, { useState } from "react";
import "./Styling/ImageManipulation.css";

import ChooseImage from "./ChooseImage";
import ChooseTurn from "./ChooseTurn";
import Spline from "@splinetool/react-spline";

const ImageManipulation = ({
  buttonPressed,
  setTurn,
  Turn,
  setPOV,
  POV,
  Tiles,
  setTiles,
  setLetters,
  setFEN,
}) => {
  const [currentOption, changeOption] = useState("Choose Image");

  return (
    <div className="container">
      <div className="spline-container">
        <Spline scene="https://prod.spline.design/T-2z0Fzwo0Gf3Sdm/scene.splinecode" />
      </div>
      {currentOption === "Choose Image" && (
        <ChooseImage setTiles={setTiles} changeScene={changeOption} />
      )}
      {currentOption === "Choose Turn" && (
        <ChooseTurn
          changeScene={buttonPressed}
          setTurn={setTurn}
          Turn={Turn}
          setPOV={setPOV}
          POV={POV}
          setTiles={setTiles}
          Tiles={Tiles}
          setLetters={setLetters}
          setFEN={setFEN}
        />
      )}
    </div>
  );
};

export default ImageManipulation;
