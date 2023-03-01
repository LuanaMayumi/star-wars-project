import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import TableHead from './TableHead';

export default function TableBody() {
  const { copyDataFiltered } = useContext(StarWarsContext);

  return (
    <div>
      <table>
        <TableHead />
        <tbody>
          {copyDataFiltered.map((item) => (
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
