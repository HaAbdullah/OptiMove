import React, { useState } from 'react';
import Opening from "./Opening";
import './App.css';
import ChooseImage from './ChooseImage';

export default function App() {


  const [scene, setScene] = useState("Opening");
  return (
    <div className='container'>
    {scene === "Opening" && <Opening buttonPressed={setScene}/>}
    {scene === "Select Image" && <ChooseImage buttonPressed={setScene}/>}
    </div>
  );
}
