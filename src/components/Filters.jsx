import React, { useContext, useState, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Filters() {
  const { searchByName,
    selectedFilter,
    setSearchByName,
    setSelectedFilter,
    setColumnValue,
    setInputValue,
    setComparisionValue,
    columnValue,
    comparisionValue,
    inputValue } = useContext(StarWarsContext);

  const [optionsPossible, setOptionsPossible] = useState([]);

  useEffect(() => {
    const options = ['population',
      'orbital_period', 'diameter', 'rotation_period', 'surface_water'];
    // pego o array de options totais, verifico em cada option se no selectedFilter tem algum filtro igual valor do filtro selecionado
    // nego o selected filter, pq se a option for igual ao filter column, retorna true e eu preciso de false pra excluir
    const filteredOptions = options.filter((option) => !selectedFilter
      .some((filter) => option === filter.column));
    setOptionsPossible(filteredOptions);
    setColumnValue(filteredOptions[0]);
    // toda vez que eu seleciono uma opção de filtro,
    // eu refaço o array de options
  }, [selectedFilter, setColumnValue]);

  const onClickButtonRemove = (nameColumn) => {
    setOptionsPossible([...optionsPossible, nameColumn]);

    setSelectedFilter(selectedFilter.filter((filter) => filter.column !== nameColumn));
  };

  return (
    <div>
      <h1>Star Wars Project</h1>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Digite o nome do planeta"
        value={ searchByName }
        name="search"
        onChange={ (event) => setSearchByName(event.target.value) }
      />
      <select
        data-testid="column-filter"
        value={ columnValue }
        onChange={ (e) => setColumnValue(
          e.target.value,
        ) }
      >
        {optionsPossible.map((option) => (
          <option
            key={ option }
            value={ option }
          >
            {option}

          </option>

        ))}
      </select>

      <select
        data-testid="comparison-filter"
        value={ comparisionValue }
        onChange={ (e) => setComparisionValue(e.target.value) }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        placeholder="Digite o numero"
        name="filterValue"
        value={ inputValue }
        onChange={ (e) => setInputValue(e.target.value) }
      />

      <button
        type="button"
        data-testid="button-filter"
        onClick={ () => {
          // clico no botão, guarda nos estados:
          // os filtros selecionados (column, comparision, value)
          // + o valor dos filtros (typeFilters)
          // seta os valores
          setSelectedFilter(
            [...selectedFilter,
              { column: columnValue, comparision: comparisionValue, value: inputValue }],
          );
        } }
      >
        Adicionar
      </button>

      {selectedFilter.map((filter, index) => (
        <div
          data-testid="filter"
          key={ index }
        >
          <span>
            {filter.column}
            {' '}
            {filter.comparision}
            {' '}
            {filter.value}
          </span>
          <button
            type="button"
            onClick={ () => onClickButtonRemove(filter.column) }
          >
            Excluir
          </button>
        </div>
      ))}
      <button
        data-testid="button-remove-filters"
        onClick={ () => setSelectedFilter([]) }
      >
        Remover todas filtragens

      </button>
    </div>
  );
}
