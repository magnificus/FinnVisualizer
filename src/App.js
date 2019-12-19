import React from 'react';
import './App.css';
import SimpleMap from './map/SimpleMap'
import axios from 'axios';
import WebGLComponent from './webgl/WebGLComponent'
import GLCommander from './webgl/GLCommander'

const dotenv = require('dotenv');
dotenv.config();

function App() {

  /*const canvas = document.querySelector(`#${"webgl"}`);
  if (!canvas){
      console.log("no canvas found");
      return; 
  }

  const gl = canvas.getContext('webgl');
  if (!gl){
      console.log("no webgl context found");
      return;
  }*/

  //GLCommander.init();
  //GLCommander.clear(1,0,0,1);


  //GLCommander.init();
  return (
    <div className="App">
      <p className="App-paragraph">its me, your boy</p>
      <WebGLComponent></WebGLComponent>
      <SimpleMap></SimpleMap>
    </div>
  );
}

export default App;
