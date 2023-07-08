

import React, { useState } from 'react';
import moveData from './move.json';

function App() {
  const [showMove, setShowMove] = useState(false);
  const [move, setMove] = useState('');

  const handleButtonClick = () => {
    setShowMove(true);
    setMove(moveData.move);
  };

  return (
    <div>
      <button onClick={handleButtonClick}>Show Move</button>
      {showMove && <p>Move: {move}</p>}
    </div>
  );
}

export default App;
