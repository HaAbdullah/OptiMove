import React, { useRef, useEffect, useState } from "react";
import Spline from "@splinetool/react-spline";
import "./Styling/Opening.css";
import attach from "/attach.svg";

const Opening = ({ buttonPressed }) => {
  const camera_transition_point = 58.061660474538165;
  const titleRef = useRef(null);
  const [animate, setAnimate] = useState(false);
  const splineRef = useRef(null);

  function onLoad(spline) {
    splineRef.current = spline;
  }

  const handleClick = () => {
    console.log("Clicked!");
    setAnimate(true);
  };

  useEffect(() => {
    const handleTransitionEnd = (event) => {
      console.log("Transition ended:", event);
      buttonPressed("Image Manipulation");
    };

    const title = titleRef.current;
    if (title) {
      title.addEventListener("transitionend", handleTransitionEnd);
    }

    const interval = setInterval(() => {
      const obj = splineRef.current.findObjectByName("Camera");
      // console.log(obj.position);
      if (
        obj &&
        obj.position.y < camera_transition_point &&
        obj.position.x < 4.919602639952208 &&
        obj.position.z == 1019.67
      ) {
        setAnimate(true);
        console.log("It has moved!");
        clearInterval(interval);
      }
    }, 100); // Check every second (1000ms)

    return () => clearInterval(interval); // Clean up interval on unmount
  }, [splineRef]);

  return (
    <div className="container">
      <div className="spline-container">
        <Spline
          scene="https://prod.spline.design/yKqXYNzky1AIJ9Kq/scene.splinecode"
          onLoad={onLoad}
        />
      </div>
      <div className="overlay">
        <h1 ref={titleRef} className={`${animate ? "slideup" : ""}`}>
          {" "}
          OptiMove
        </h1>
        <img src=""></img>
      </div>
      <div
        className={`attach-img ${animate ? "slideup" : ""}`}
        onClick={handleClick}
      >
        <img src={attach} alt="Button to Attach Image"></img>
      </div>
    </div>
  );
};

export default Opening;
