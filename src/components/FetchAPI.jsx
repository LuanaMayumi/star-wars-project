import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from '../context/StarWarsContext';

export default function FetchAPI({ children }) {
  const [dataFiltered, setDataFiltered] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const filtered = await data.results.filter((planet) => delete planet.residents);
      console.log(filtered);
      // const filtered = data.results.map((info) => {
      //   delete info.residents;
      //   return info;
      // });
      setDataFiltered(filtered);
    };
    fetchAPI();
  }, []);

  const context = {
    dataFiltered,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {/* // passo o contexto pra toda a aplicação */}
      {children}
    </StarWarsContext.Provider>
  );
}

FetchAPI.propTypes = {
  children: PropTypes.node,
}.isRequired;
