import React from 'react';
import Table from './components/Table';
import './App.css';
import FetchAPI from './components/FetchAPI';

function App() {
  return (
    // o table recebe as infos do FetchAPI
    <FetchAPI>
      <Table />
    </FetchAPI>
  );
}

export default App;
