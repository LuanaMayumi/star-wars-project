// import React, { useState, useContext } from 'react';
// import StarWarsContext from '../context/StarWarsContext';

// export default function FilterField() {
//   const [search, setSearch] = useState([]);
//   const { dataFiltered } = useContext(StarWarsContext);
//   // console.log(search.toLowerCase());
//   // const search
//   const filteringByName = dataFiltered
//     .filter((searchName) => searchName.name.includes(search));

//   console.log(filteringByName);

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Pesquise aqui"
//         value={ search }
//         name="search"
//         onChange={ (event) => setSearch(event.target.value) }
//       />
//     </div>
//   );
// }
