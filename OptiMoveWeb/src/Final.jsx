import React, {useState, useEffect} from 'react';
import "./Styling/Final.css";
import i1 from "./img/input1.png";
import i2 from "./img/input2.png";
import i3 from "./img/input3.png";

import info from "./output-info.json";


const Final = ({Turn, POV, imgNum}) =>{
    // BOARD IMAGE
    const images = [i1, i2, i3];
    // IMAGE TILES
    const [tiles, settiles] = useState({});
    const rows = ['8', '7', '6', '5', '4', '3', '2', '1'];
    const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    
    // const rowOrder =rows;
    // const colOrder =columns;

    const imgPOV = {
        1: "white",
        2: "white",
        3: "black"
    }

    //Once pieces are properly in places in optimove, uncomment this
    const rowOrder = imgPOV[imgNum] === "white" ? rows : [...rows].reverse();
    const colOrder = imgPOV[imgNum] === "white" ? columns : [...columns].reverse();

    // Here is my work around to import mass images in scale, unsure if this is the industry standard but it works really well
    // wait for each of the images to be properly loaded into the variable "loadImages" (dictionary) that variable is then used as the images.
   
    const [letters, setLetters] = useState([]);
    const [FEN, setFEN] = useState([]);
    const [move, setMove] = useState([]);

    useEffect (()=>{
        const newLetters = info[imgNum]["TilesLetters"];
        const newFEN = info[imgNum][Turn]["FEN"];
        const newMove = info[imgNum][Turn]["Move"];
        
        setLetters(newLetters);
        setFEN(newFEN);
        setMove(newMove);
    }, [imgNum, info]
    );

    useEffect(() => {
        const loadtiles = async () => {
            const loadedtiles = {};
            for (let row of rows) {
                for (let col of columns) {
                    const imgKey = `${col}-${row}`;
                    loadedtiles[imgKey] = await import(`./Tiles/${imgNum}/${POV}_POV/${col}-${row}.png`);
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
    const tileDivs = rowOrder.flatMap(row =>
        colOrder.map(col => {
            const tileName = `${col}${row}`;
            const tileSrc = tiles[`${col}-${row}`]?.default; // Access the default export. "`${col}-${row}`" is the key sent in the UseEffect
            //This is needed because import() returns an object and this is the way to get the actual image inside.
            // the "? is seperate meaning "wait for it to render"
            // console.log(tileSrc);
            return<div key={tileName} className="tile">
                {/* this is where the "?" is used  */}
                {tileSrc ? <img className ="tile-img" src={tileSrc} alt={tileName} /> : <div className="loading">Loading...</div>} 
            </div>;
            
        })
    );

    // LETTER TILES
    // Retrieve letters from user input
    const pieceDivs = letters.map((tileLetter, index) =>{
        return <div key = {index} className = "tile-letter">{tileLetter}</div>
    }
    );

    return (
        <div className="Final">
            <div className = "Main">
                    <div className = "diagram-row">
                        <div className="board-container">
                            <img className = "board-img" src = {images[imgNum - 1]}></img>
                        </div>
                        <div className="transition-arrow">
                        <div className="arrow">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        </div>
                        <div className="board-tiles">
                            <div className = "tiles-container">
                                {tileDivs}
                            </div>
                        </div>
                        <div className="transition-arrow">
                            <div className="arrow">
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <div className="letter-tiles-container">
                            <div className = "letter-tiles">
                                {pieceDivs}
                            </div>
                        </div>
                    </div> 
                    <div className='result-container'>
                        <div className = 'FEN'>
                            {FEN}
                        </div>
                        <div className = 'Move'>
                            {move}
                        </div>
                        <div className = 'Reset'></div>
                    </div>
                    {/* <div className='line-container'></div> */}
            </div>
            <div className = "Footer"> </div>
        </div>
    );
}

export default Final;

