import Select from 'react-select';
import { useEffect, useState } from 'react';
import { Genres } from 'types/genres';
import { requestBackend } from 'util/requests';

import './styles.css';

const Filter = () => {

 const [selectGenre, setSelectGenre] = useState<Genres[]>([]);

 useEffect(() => {
  requestBackend({withCredentials: true, url: '/genres'})
  .then(response => {
    console.log(response)
    setSelectGenre(response.data)
  })
 }, []);

  return (
    <form className="movie-filter-genre-form">
      <div className="base-card movie-filter-genre-container">
        <Select 
        options={selectGenre}
        isMulti
        classNamePrefix="movie-filter-genre-select"
        getOptionLabel={(genre: Genres) => genre.name}
        getOptionValue={(genre: Genres) => String(genre.id)}
        />
      </div>
    </form>
  );
};

export default Filter;
