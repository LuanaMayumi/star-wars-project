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

  // estado criado pra ordenar as opções do columm
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

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

  useEffect(() => {
    // console.log(copyDataFiltered, 'filtrou os planetas');
    let copyPlanets = [...dataFiltered];
    copyPlanets = copyPlanets
      .filter((planet) => selectedFilter.every((filter) => {
        // bracket notation - dot notation
        // em cada planeta (tatooine)
        // o every verifica se o tatooine atende as condições
        if (filter.comparision === 'maior que') {
          // pega a coluna que eu escolho (filter.column)
          // se for maior, o every retorna TRUE
          // o filter recebe o true e entende que é pra manter o planeta
          // o filter fica com os planetas que deram true e coloca na variavel copyPlanets
          return Number(planet[filter.column]) > Number(filter.value);
        } if (filter.comparision === 'menor que') {
          return Number(planet[filter.column]) < Number(filter.value);
        }
        return Number(planet[filter.column]) === Number(filter.value);
      }));
    setCopyDataFiltered(copyPlanets);
    setComparisionValue('maior que');
    setInputValue(0);
  }, [selectedFilter, dataFiltered]);

  useEffect(() => {
    copyDataFiltered.sort(() => {});
  }, []);

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
