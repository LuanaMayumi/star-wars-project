import React, { useContext } from 'react';
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
    inputValue,
    filtering } = useContext(StarWarsContext);

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
        { !selectedFilter.includes('population')
        && <option value="population">population</option>}
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
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
          filtering();
          // clico no botão, guarda nos estados:
          // os filtros selecionados (column, comparision, value)
          // + o valor dos filtros (typeFilters)
          // seta os valores
          setSelectedFilter(
            [...selectedFilter, columnValue, comparisionValue, inputValue],
          );
        } }
      >
        Adicionar
      </button>
    </div>
  );
}
