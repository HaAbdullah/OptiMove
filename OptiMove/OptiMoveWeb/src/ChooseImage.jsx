import React, { useRef, useState, useEffect } from "react";
import "./Styling/ChooseImage.css";
import attach2 from "/attach2.svg";

const ChooseImage = ({ changeScene }) => {
  const [animate, setAnimate] = useState(false);
  const leftImgRef = useRef(null);
  const ImgFormRef = useRef(null);

  const handleTransitionEnd = (event) => {
    // Check if the transition was for the 'filter' property
    if (event.propertyName === "filter") {
      changeScene("Choose Turn");
    }
  };

  const handleClick = () => {
    console.log("Uploaded Image");
    ImgFormRef.current.click(); // Trigger the hidden file input
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file

    if (file) {
      const formData = new FormData();
      formData.append("usrImg", file);
      console.log("Image added to FormData:", file.name);

      fetch("http://127.0.0.1:5000/api/saveImage", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.message);
          setAnimate(true);
        })
        .catch((error) => console.error("Error:", error));
    }
  };

  // Use useEffect to handle event listeners
  useEffect(() => {
    const leftImg = leftImgRef.current;

    if (leftImg && animate) {
      leftImg.addEventListener("transitionend", handleTransitionEnd);
    }

    // Cleanup function to remove the event listener
    return () => {
      if (leftImg) {
        leftImg.removeEventListener("transitionend", handleTransitionEnd);
      }
    };
  }, [animate]); // Run effect when 'animate' changes

  return (
    <div className="Interact">
      <div className="Images">
        <input
          type="file"
          ref={ImgFormRef}
          style={{ display: "none" }} // Hide the file input
          onChange={handleFileChange} // Handle file selection
        />
        <img
          ref={leftImgRef}
          className={`inputs ${animate ? "leftImg" : ""}`}
          onClick={handleClick} // Use the handleClick function
          src={attach2}
          alt="First option for chess board inputs"
        />
      </div>
      <div className="Choice">
        <span className={`prompt-1 ${animate ? "animatePrompt" : ""}`}>
          Upload An Image
        </span>
      </div>
    </div>
  );
};

export default ChooseImage;
