import React, {useState, useEffect} from 'react';
import "./Styling/ChooseTurn.css"
import i1 from "./img/input1.png"
import i2 from "./img/input2.png"
import i3 from "./img/input3.png"

const ChooseTurn = ({changeScene, currentImg, setTurn, Turn, setPOV, POV}) =>{
    const [animate, setAnimate] = useState(false);
    const [promptText, setPromptText] = useState("Whose Turn?");
    const [animationPhase, setAnimationPhase] = useState(0);
    const [initialAnimationDone, setInitialAnimationDone] = useState(false);
    const [CompleteScene, setCompleteScene] = useState(false);
    const numToImg = (num) => {
        switch (num){
            case 1:
                return i1;
            case 2:
                return i2;
            case 3:
                return i3;
        }
    } 

    const handleSelection = (color) => {
        if (!Turn){
            setTurn(color);
            console.log(`Pressed ${color}`);
            setAnimate(true);
        }
        else{
            setPOV(color);
            console.log(`Pressed ${color}`);
            setCompleteScene(true);
        }
    }
    // When scene is completed (both options selected)
    useEffect(() => {
        if (CompleteScene){
        setTimeout(() => {
            console.log("Scene completed");
            changeScene("Final");
        }, 1000)
    }
    }, [CompleteScene])
    // Checks if the initial prompt animation is completed so that it can remove that class (needed to add the new transitions)
    useEffect(() => {
        const timer = setTimeout(() => setInitialAnimationDone(true), 700); 
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (animate) {
          // Phase 1: Move down
          setAnimationPhase(1);
          
          setTimeout(() => {
            // Phase 2: Change text and move off-screen
            setPromptText(`Point Of View?`);
            setAnimationPhase(2);
            
            setTimeout(() => {
              // Phase 3: Move up
              setAnimationPhase(3);
              
              setTimeout(() => {
                // Reset animation state
                setAnimate(false);
                setAnimationPhase(0);
              }, 300); // move up
            }, 300); // change text
          }, 300); // move down
        }
      }, [animate, Turn]);

    return (
        <>
        <div className="ChooseTurnContainer">
                <img className="Center-Image fade-in" src={numToImg(currentImg)} alt="First option for chess board inputs" ></img>
            <div className="turn-container">
                <div className = "black" onClick = {() => {handleSelection("black")}}>BLACK</div>
                <div className = "white" onClick = {() => {handleSelection("white")}}>WHITE</div>
            </div>
            <div className={`prompt-2 ${!initialAnimationDone ? 'initial-animation' : ''} ${
                animationPhase === 1 ? 'move-down' : 
                animationPhase === 2 ? 'off-screen' : 
                animationPhase === 3 ? 'move-up' : ''
                }`}>
                {promptText}
            </div>
        
        </div>
        <div className = {`transitionScreen ${CompleteScene ? 'active' : ''}`}> </div>
        </>
    );
}

export default ChooseTurn;