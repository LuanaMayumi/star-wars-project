import React, { useContext, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableHead from './TableHead';

export default function TableBody() {
  const { dataFiltered } = useContext(StarWarsContext);
  const [search, setSearch] = useState('');
  // console.log(search.toLowerCase());

  const filteredByName = dataFiltered
    .filter((searchName) => searchName.name.includes(search));

  console.log(filteredByName);
  return (
    <div>
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Pesquise aqui"
        value={ search }
        name="search"
        onChange={ (event) => setSearch(event.target.value) }
      />
      <table>
        <TableHead />
        <tbody>
          {filteredByName.map((item) => (
          // {dataFiltered.map((item) => (
            <tr
              key={ item.name }
            >
              <td>{item.name}</td>
              <td>{item.rotation_period}</td>
              <td>{item.orbital_period}</td>
              <td>{item.diameter}</td>
              <td>{item.climate}</td>
              <td>{item.gravity}</td>
              <td>{item.terrain}</td>
              <td>{item.surface_water}</td>
              <td>{item.population}</td>
              <td>{item.films}</td>
              <td>{item.created}</td>
              <td>{item.edited}</td>
              <td>{item.url}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
