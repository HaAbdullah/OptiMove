import React from 'react';
import "./Styling/ChooseImage.css"
import i1 from "./img/input1.png"
import i2 from "./img/input2.png"
import i3 from "./img/input3.png"

const ChooseImage = ({buttonPressed}) => {

    let imgDimensions = 300;
    return (
    <div className="container">
        <div className="Interact">
            <div className = "Images">
                <img className = "inputs" src={i1} alt="First option for chess board inputs" ></img>
                <img className = "inputs" src={i2} alt="Second option for chess board inputs"></img>
                <img className = "inputs" src={i3} alt="Third option for chess board inputs" ></img>
            </div>
            <div className= "Choice">
                <span className = "prompt-1">Select An Image</span>
            </div>
        </div>
    </div>
    );
};

export default ChooseImage;