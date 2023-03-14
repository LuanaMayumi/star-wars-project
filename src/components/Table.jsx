import React from 'react';
import Filters from './Filters';
import TableBody from './TableBody';
import logo from '../assets/Logo.svg';

export default function Table() {
  return (
    <>
      <div
        className="logo"
      >
        <img
          src={ logo }
          alt="logo"
        />
      </div>
      <div
        className="table"
      >
        <Filters />
        <TableBody />
      </div>
    </>
  );
}
