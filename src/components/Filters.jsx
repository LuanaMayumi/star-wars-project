import React, { useContext, useState, useEffect } from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import StarWarsContext from '../context/StarWarsContext';
import search from '../assets/Search.svg';

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
    order,
    setOrder,
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
      <div
        className="containerSearchName"
      >
        <input
          className="inputSearchName"
          data-testid="name-filter"
          type="text"
          placeholder="Digite o nome do planeta"
          value={ searchByName }
          name="search"
          onChange={ (event) => setSearchByName(event.target.value) }
        />
        <img
          src={ search }
          alt="search"
        />
      </div>
      <div
        className="containerInputsOptions"
      >
        <label>
          <p>Coluna</p>
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
        </label>
        <label>
          <p>Operador</p>
          <select
            data-testid="comparison-filter"
            value={ comparisionValue }
            onChange={ (e) => setComparisionValue(e.target.value) }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
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
                { column: columnValue,
                  comparision: comparisionValue,
                  value: inputValue }],
            );
          } }
        >
          Filtrar
        </button>
        <button
          data-testid="button-remove-filters"
          onClick={ () => setSelectedFilter([]) }
        >
          Remover todas filtragens
        </button>
        <div
          className="inputRadio"
        >
          <label
            htmlFor="ascendente"
          >
            <input
              type="radio"
              name="radio"
              value="ascendente"
              id="ascendente"
              onClick={ () => {
                setOrder({ ...order, sort: 'ASC' });
              } }
            />
            Ascendente
          </label>
          <label htmlFor="descendente">
            <input
              type="radio"
              name="radio"
              value="descendente"
              id="descendente"
              onClick={ () => {
                setOrder({ ...order, sort: 'DESC' });
              } }
            />
            Descendente
          </label>
        </div>
        {selectedFilter.map((filter, index) => (
          <div
            data-testid="filter"
            key={ index }
          >
            {/* <button
              type="button"
              onClick={ () => onClickButtonRemove(filter.column) }
            >
              <MdOutlineDelete />
            </button> */}
          </div>
        ))}
      </div>
      <div className="filtersApplied">
        {selectedFilter.length === 0
          ? (
            <p className="titleFilterApplied">
              Nenhum filtro aplicado
              {' '}
            </p>)
          : (
            <div>
              <p className="titleFilterApplied">
                Filtros aplicados:
                {' '}
              </p>
              {selectedFilter.map((filter, index) => (
                <div key={ index }>
                  <div className="filterAndButton">
                    <span>
                      {filter.column}
                      {' '}
                      {filter.comparision}
                      {' '}
                      {filter.value}
                    </span>
                    <button
                      className="buttonExcluir"
                      type="button"
                      onClick={ () => onClickButtonRemove(filter.column) }
                    >
                      <MdOutlineDelete
                        size={ 20 }
                        className="iconTrash"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
      </div>
    </div>
  );
}
