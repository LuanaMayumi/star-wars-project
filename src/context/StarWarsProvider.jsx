import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';

export default function StarWarsProvider({ children }) {
  const [dataFiltered, setDataFiltered] = useState([]);
  const [copyDataFiltered, setCopyDataFiltered] = useState([]);

  // estado criado para armazenar o nome do planeta digitado no input
  const [searchByName, setSearchByName] = useState('');

  // estado criado para armazenar a escolha dos filtros
  const [selectedFilter, setSelectedFilter] = useState([]);

  // estado criado para armazenar os valores dos filtros escolhidos pelo usuario
  const [columnValue, setColumnValue] = useState('population');
  const [comparisionValue, setComparisionValue] = useState('maior que');
  const [inputValue, setInputValue] = useState(0);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await fetch('https://swapi.dev/api/planets');
      const data = await response.json();
      const filtered = await data.results.filter((planet) => delete planet.residents);
      // console.log(filtered);
      // const filtered = data.results.map((info) => {
      //   delete info.residents;
      //   return info;
      // });
      setDataFiltered(filtered);
      setCopyDataFiltered(filtered);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    // faço uma cópia que recebe o retorno da API
    const copyPlanets = dataFiltered
      .filter((searchName) => searchName.name.toUpperCase()
        .includes(searchByName.toUpperCase()));
    // seta o estado com o resultado ja filtrado
    setCopyDataFiltered(copyPlanets);
    // o useEffect só vai rodar (o compomente será renderizado)
    // qdo os parametros abaixo sofrerem alteração
    // ou seja: qdo alguem pesquisar no campo input pelo nome
    // ou qdo a API rodar (ao atualizar a pagina)
  }, [searchByName, dataFiltered]);

  // FILTROS

  const filtering = () => {
    // variável que recebe a cópia do retorno da API
    let copyPlanets = copyDataFiltered;
    console.log(comparisionValue);
    console.log(columnValue);
    console.log(inputValue);
    console.log(copyDataFiltered);
    // bracket notation - dot notation
    // se columnValue for igual a population, então planet[columnValue] é como se fosse planet.population ()
    // verificar se o valor dessa clave (no caso population) é maior que o inputValue
    if (comparisionValue === 'maior que') {
      copyPlanets = copyPlanets
        .filter((planet) => Number(planet[columnValue]) > Number(inputValue));
    } else if (comparisionValue === 'menor que') {
      copyPlanets = copyPlanets
        .filter((planet) => Number(planet[columnValue]) < Number(inputValue));
    } else {
      copyPlanets = copyPlanets
        .filter((planet) => Number(planet[columnValue]) === Number(inputValue));
    }

    setCopyDataFiltered(copyPlanets);
    setColumnValue('population');
    setComparisionValue('maior que');
    setInputValue(0);
  };

  const context = {
    dataFiltered,
    searchByName,
    selectedFilter,
    copyDataFiltered,
    columnValue,
    comparisionValue,
    inputValue,
    setColumnValue,
    setInputValue,
    setComparisionValue,
    setSearchByName,
    setSelectedFilter,
    filtering,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {/* // passo o contexto pra toda a aplicação */}
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: PropTypes.node,
}.isRequired;
