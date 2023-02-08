import axios, { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';
import ProductFilter from 'components/ProductFilter';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movies';
import { SpringPage } from 'types/spring-page';
import { BASE_URL } from 'util/requests';
import { getAuthData } from 'util/storage';

import './styles.css';

const SelectMovies = () => {
  const [movies, setMovies] = useState<SpringPage<Movie>>();

  useEffect(() => {
    const params: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + '/movies',
      headers: {
        Authorization: `Bearer ${getAuthData().access_token}`,
      },
    };

    axios(params).then((response) => {
      setMovies(response.data);
    });
  }, []);

  return (
    <div className="container my-4 movies-container">
      <div className="row movie-title-container">
        <ProductFilter />
      </div>

      <div className="row list-movies">
        {movies?.content.map((movie) => (
          <div className="col-sm-6 col-lg-4 col-xl-3" key={movie.id}>
            <Link to={'/movies/' + movie?.id}>
              <MovieCard movies={movie} />
            </Link>
            
          </div>
        ))}
        <Pagination />
      </div>
    </div>
  );
};

export default SelectMovies;
