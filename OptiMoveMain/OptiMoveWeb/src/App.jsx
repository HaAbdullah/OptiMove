import React, { useState } from "react";
import "./App.css";

import Opening from "./Opening";
import ImageManipulation from "./ImageManipulation";
import Final from "./Final";
export default function App() {
  const [scene, setScene] = useState("Image Manipulation");
  const [Turn, setTurn] = useState(null);
  const [POV, setPOV] = useState(null);

  let [FEN, setFEN] = useState("");
  let [letters, setLetters] = useState([]);

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
        />
      )}
      {scene === "Final" && (
        <Final
          POV={POV}
          Turn={Turn}
          sceneChanger={setScene}
          FEN={FEN}
          letters={letters}
          setFEN={setFEN}
          setLetters={setLetters}
        />
      )}
    </div>
  );
}
