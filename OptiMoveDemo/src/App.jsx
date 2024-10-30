import React, { useState } from "react";
import "./App.css";

import Opening from "./Opening";
import ImageManipulation from "./ImageManipulation";
import Final from "./Final";
export default function App() {
  const [scene, setScene] = useState("Opening");
  const [Turn, setTurn] = useState(null);
  const [POV, setPOV] = useState(null);
  const [nextImg, changeNextImg] = useState(0);

  return (
    <div className="container">
      {scene === "Opening" && <Opening buttonPressed={setScene} />}
      {scene === "Image Manipulation" && (
        <ImageManipulation
          buttonPressed={setScene}
          setTurn={setTurn}
          Turn={Turn}
          setPOV={setPOV}
          POV={POV}
          nextImg={nextImg}
          changeNextImg={changeNextImg}
        />
      )}
      {scene === "Final" && (
        <Final POV={POV} Turn={Turn} imgNum={nextImg} sceneChanger={setScene} />
      )}
    </div>
  );
}
