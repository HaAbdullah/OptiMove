import React, { useState, useEffect } from "react";
import "./Styling/Final.css";
import i1 from "./img/input1.png";
import i2 from "./img/input2.png";
import i3 from "./img/input3.png";

import info from "./output-info.json";

const Final = ({ Turn, POV, imgNum, sceneChanger }) => {
  // BOARD IMAGE
  const images = [i1, i2, i3];
  // IMAGE TILES
  const [tiles, settiles] = useState({});
  const rows = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const columns = ["a", "b", "c", "d", "e", "f", "g", "h"];

  // const rowOrder =rows;
  // const colOrder =columns;

  const imgPOV = {
    1: "white",
    2: "white",
    3: "black",
  };

  //Once pieces are properly in places in optimove, uncomment this
  const rowOrder = imgPOV[imgNum] === "white" ? rows : [...rows].reverse();
  const colOrder =
    imgPOV[imgNum] === "white" ? columns : [...columns].reverse();

  // Here is my work around to import mass images in scale, unsure if this is the industry standard but it works really well
  // wait for each of the images to be properly loaded into the variable "loadImages" (dictionary) that variable is then used as the images.

  const [letters, setLetters] = useState([]);
  const [FEN, setFEN] = useState([]);
  const [move, setMove] = useState([]);

  useEffect(() => {
    const newLetters = info[imgNum]["TilesLetters"];
    const newFEN = info[imgNum][Turn]["FEN"];
    const newMove = info[imgNum][Turn]["Move"];

    setLetters(newLetters);
    setFEN(newFEN);
    setMove(newMove.toUpperCase());
  }, [imgNum, info]);

  useEffect(() => {
    const loadtiles = async () => {
      const loadedtiles = {};
      for (let row of rows) {
        for (let col of columns) {
          const imgKey = `${col}-${row}`;
          loadedtiles[imgKey] = await import(
            `./Tiles/${imgNum}/${POV}_POV/${col}-${row}.png`
          );
          // console.log(loadedtiles[imgKey]);
        }
      }
      settiles(loadedtiles);
    };

    loadtiles();
  }, [Turn, POV, imgNum]);

  // Gets the proper tiles for the user inputs
  // Array of tiles

  // Need to flatten the result because you want one array, not nested array
  const tileDivs = rowOrder.flatMap((row) =>
    colOrder.map((col) => {
      const tileName = `${col}${row}`;
      const tileSrc = tiles[`${col}-${row}`]?.default; // Access the default export. "`${col}-${row}`" is the key sent in the UseEffect
      //This is needed because import() returns an object and this is the way to get the actual image inside.
      // the "? is seperate meaning "wait for it to render"
      // console.log(tileSrc);
      return (
        <div key={tileName} className="tile">
          {/* this is where the "?" is used  */}
          {tileSrc ? (
            <img className="tile-img" src={tileSrc} alt={tileName} />
          ) : (
            <div className="loading">...</div>
          )}
        </div>
      );
    })
  );

  // LETTER TILES
  // Retrieve letters from user input
  const pieceDivs = letters.map((tileLetter, index) => {
    return (
      <div key={index} className="tile-letter">
        {tileLetter}
      </div>
    );
  });

  return (
    <div className="Final">
      <div className="Main">
        <div className="diagram-row">
          <div className="board-container">
            <img className="board-img" src={images[imgNum - 1]}></img>
          </div>
          <div className="transition-arrow">
            <div className="arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="board-tiles">
            <div className="tiles-container">{tileDivs}</div>
          </div>
          <div className="transition-arrow">
            <div className="arrow">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className="letter-tiles-container">
            <div className="letter-tiles">{pieceDivs}</div>
          </div>
        </div>
        <div className="result-container">
          <div
            className="FEN"
            onClick={() => {
              navigator.clipboard.writeText(FEN);
            }}
          >
            {FEN}
          </div>
          <div className="Move">{move}</div>
          <div className="Reset" onClick={() => sceneChanger("Opening")}>
            <svg
              className="reset-img"
              version="1.1"
              viewBox="0.0 0.0 159.28083989501312 152.7270341207349"
              fill="none"
              stroke="none"
              stroke-linecap="square"
              stroke-miterlimit="10"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              xmlns="http://www.w3.org/2000/svg"
            >
              <clipPath id="p.0">
                <path
                  d="m0 0l159.28084 0l0 152.72704l-159.28084 0l0 -152.72704z"
                  clip-rule="nonzero"
                />
              </clipPath>
              <g clip-path="url(#p.0)">
                <path
                  fill="#000000"
                  fill-opacity="0.0"
                  d="m0 0l159.28084 0l0 152.72704l-159.28084 0z"
                  fill-rule="evenodd"
                />
                <path
                  fill="#0f1a20"
                  d="m0 0l156.37796 0l0 150.4252l-156.37796 0z"
                  fill-rule="evenodd"
                />
                <path
                  stroke="#4045c9"
                  stroke-width="10.0"
                  stroke-linejoin="round"
                  stroke-linecap="butt"
                  d="m0 0l156.37796 0l0 150.4252l-156.37796 0z"
                  fill-rule="evenodd"
                />
                <path
                  fill="#ff4d94"
                  d="m33.57192 130.84026l97.76378 0l0 -20.188972l-97.76378 0z"
                  fill-rule="evenodd"
                />
                <path
                  stroke="#ff4d94"
                  stroke-width="1.0"
                  stroke-linejoin="round"
                  stroke-linecap="butt"
                  d="m33.57192 130.84026l97.76378 0l0 -20.188972l-97.76378 0z"
                  fill-rule="evenodd"
                />
                <path
                  fill="#ff4d94"
                  d="m33.573566 39.79621l97.79343 0l0 -20.210997l-97.79343 0z"
                  fill-rule="evenodd"
                />
                <path
                  stroke="#ff4d94"
                  stroke-width="1.0"
                  stroke-linejoin="round"
                  stroke-linecap="butt"
                  d="m33.573566 39.79621l97.79343 0l0 -20.210997l-97.79343 0z"
                  fill-rule="evenodd"
                />
                <path
                  fill="#ff4d94"
                  d="m131.3676 130.85039l0 -111.273605l-20.832443 0l0 111.273605z"
                  fill-rule="evenodd"
                />
                <path
                  stroke="#ff4d94"
                  stroke-width="1.0"
                  stroke-linejoin="round"
                  stroke-linecap="butt"
                  d="m131.3676 130.85039l0 -111.273605l-20.832443 0l0 111.273605z"
                  fill-rule="evenodd"
                />
                <path
                  fill="#ff4d94"
                  d="m52.95009 130.85039l0 -60.482162l-22.796642 0l0 60.482162z"
                  fill-rule="evenodd"
                />
                <path
                  stroke="#ff4d94"
                  stroke-width="1.0"
                  stroke-linejoin="round"
                  stroke-linecap="butt"
                  d="m52.95009 130.85039l0 -60.482162l-22.796642 0l0 60.482162z"
                  fill-rule="evenodd"
                />
                <path
                  fill="#ff4d94"
                  d="m13.233487 84.85541l28.317242 -31.410004l28.317238 31.410004z"
                  fill-rule="evenodd"
                />
                <path
                  stroke="#ff4d94"
                  stroke-width="1.0"
                  stroke-linejoin="round"
                  stroke-linecap="butt"
                  d="m13.233487 84.85541l28.317242 -31.410004l28.317238 31.410004z"
                  fill-rule="evenodd"
                />
              </g>
            </svg>
          </div>
        </div>
      </div>
      <div className="Footer">
        <h1 className="Title">OPTIMOVE DEMO:</h1>
        <div className="description-container">
          <p>
            OptiMove leverages computer vision to detect the chessboard in any
            image, extract it from the background, identify the pieces and the
            Chess position using machine learning, and generate an FEN while
            calculating the best move. To try the full app with any image,
            please visit the GitHub Repository.{" "}
          </p>
        </div>
        <div className="github-btn">
          <svg
            className="github-logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 28 29"
            fill="none"
          >
            <path
              d="M14 0.689255C12.1615 0.689255 10.341 1.05328 8.64243 1.76054C6.94387 2.4678 5.40053 3.50445 4.1005 4.81131C1.475 7.45061 0 11.0303 0 14.7628C0 20.9833 4.018 26.2609 9.576 28.1327C10.276 28.2453 10.5 27.809 10.5 27.429V25.0506C6.622 25.895 5.796 23.1647 5.796 23.1647C5.152 21.5322 4.242 21.0959 4.242 21.0959C2.968 20.2234 4.34 20.2515 4.34 20.2515C5.74 20.35 6.482 21.7011 6.482 21.7011C7.7 23.8403 9.758 23.207 10.556 22.8692C10.682 21.9544 11.046 21.3352 11.438 20.9833C8.33 20.6315 5.068 19.4212 5.068 14.0591C5.068 12.497 5.6 11.2444 6.51 10.2452C6.37 9.89336 5.88 8.42971 6.65 6.52978C6.65 6.52978 7.826 6.1498 10.5 7.96529C11.606 7.65567 12.81 7.50086 14 7.50086C15.19 7.50086 16.394 7.65567 17.5 7.96529C20.174 6.1498 21.35 6.52978 21.35 6.52978C22.12 8.42971 21.63 9.89336 21.49 10.2452C22.4 11.2444 22.932 12.497 22.932 14.0591C22.932 19.4352 19.656 20.6174 16.534 20.9693C17.038 21.4055 17.5 22.264 17.5 23.5729V27.429C17.5 27.809 17.724 28.2594 18.438 28.1327C23.996 26.2468 28 20.9833 28 14.7628C28 12.9147 27.6379 11.0846 26.9343 9.3771C26.2307 7.66961 25.1995 6.11816 23.8995 4.81131C22.5995 3.50445 21.0561 2.4678 19.3576 1.76054C17.659 1.05328 15.8385 0.689255 14 0.689255Z"
              fill="currentColor"
            />
          </svg>
          <div
            className="button-txt"
            onClick={() =>
              window.open(
                "https://github.com/HaAbdullah/OptiMove",
                "_blank",
                "noreferrer"
              )
            }
          >
            VISIT GITHUB
          </div>
        </div>
      </div>
      {/* <div className='line-container'></div> */}
    </div>
  );
};

export default Final;

//enjoy: https://youtube.com/shorts/opABLRcCDzw?si=O56_HsVFAOdZclz0
