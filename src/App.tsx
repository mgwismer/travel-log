import React from 'react';
import './App.css';
import { MapTest } from './components/map';
import { WorldMap } from './components/world-map';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Travel Log
      </header>
      <WorldMap/>
    </div>
  );
}

export default App;
