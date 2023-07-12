import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [showMove, setShowMove] = useState(false);
  const [move, setMove] = useState('');

  const [image, setImage] = useState(null);
  const [playingAs, setPlayingAs] = useState('WHITE');

  const handleMoveButtonClick = async () => {
    setShowMove(true);

    try {
      const response = await axios.get('http://localhost:5000/get-move');
      setMove(response.data.move);
    } catch (error) {
      console.error(`Error: ${error.medssage}`);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };

    if (file) {
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleButtonClick = (value) => {
    setPlayingAs(value);
  };

  return (
    <div className="App">
      <h1 className="title">OptiMove</h1>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && <img src={image} alt="Uploaded" />}
      <p className="player">Playing as: {playingAs}</p>
      <div className="buttonGroup">
        <button
          className={`gameButton ${playingAs === 'BLACK' ? 'active' : ''}`}
          onClick={() => handleButtonClick('BLACK')}
        >
          BLACK
        </button>
        <button
          className={`gameButton ${playingAs === 'WHITE' ? 'active' : ''}`}
          onClick={() => handleButtonClick('WHITE')}
        >
          WHITE
        </button>
      </div>
      <div>
        <button className="moveButton" onClick={handleMoveButtonClick}>
          Show Move
        </button>
        {showMove && <p className="moveText">Move: {move}</p>}
      </div>
    </div>
  );
}

export default App;
