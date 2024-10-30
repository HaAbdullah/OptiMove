import React, {useRef, useState} from 'react';
import "./Styling/ChooseImage.css"
import i1 from "./img/input1.png"
import i2 from "./img/input2.png"
import i3 from "./img/input3.png"


const ChooseImage = ({changeScene, selectImg}) => {
    const [animate, setAnimate] = useState(false)
    const leftImgRef =  useRef(null);
    const leftImg = leftImgRef.current;

    const handleTransitionEnd = () => {
        changeScene("Choose Turn");
    }

    if (leftImg) {
        leftImg.addEventListener('transitionend', handleTransitionEnd);
    }  


    const handleClick = (imgNum) =>{
        switch (imgNum){
            case 1:
                console.log("Clicked image 1");
                selectImg(1);
                setAnimate(true);
                break;
            case 2:
                console.log("Clicked image 2");
                selectImg(2);
                setAnimate(true);
                break;
            case 3:
                console.log("Clicked image 3");
                selectImg(3);
                setAnimate(true);
                break;
        }
    }


    return (
        <div className="Interact">
            <div className = "Images">
                <img ref={leftImgRef} className={`inputs ${animate ? 'leftImg' : ''}`} onClick = {() => handleClick(1)} src={i1} alt="First option for chess board inputs" ></img>
                <img className={`inputs ${animate ? 'middleImg' : ''}`} onClick = {() => handleClick(2)} src={i2} alt="Second option for chess board inputs"></img>
                <img  className={`inputs ${animate ? 'rightImg' : ''}`} onClick = {() => handleClick(3)} src={i3} alt="Third option for chess board inputs" ></img>
            </div>
            <div className= "Choice">
                <span className={`prompt-1 ${animate ? 'animatePrompt' : ''}`}>Select An Image</span>
            </div>
        </div>
    );

};

export default ChooseImage;