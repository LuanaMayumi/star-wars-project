import React from 'react';
import Table from './components/Table';
import './App.sass';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    // o table recebe as infos do FetchAPI
    <StarWarsProvider>
      <Table />
    </StarWarsProvider>
  );
}

export default App;
