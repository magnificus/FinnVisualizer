import React from 'react';
import './App.css';
import SimpleMap from './map/SimpleMap'
import axios from 'axios';

const dotenv = require('dotenv');
dotenv.config();

function App() {
  return (
    <div className="App">
      <header className="App-header">
        waddup honkey
      </header>
      <p className="App-paragraph">its me, your boy</p>
      <SimpleMap></SimpleMap>
    </div>
  );
}

export default App;
