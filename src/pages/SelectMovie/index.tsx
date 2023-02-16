import axios, { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movies';
import { SpringPage } from 'types/spring-page';
import { BASE_URL, requestBackend } from 'util/requests';
import { getAuthData } from 'util/storage';
import Filter from 'components/Filter';

import './styles.css';

const SelectMovies = () => {
  const [movies, setMovies] = useState<SpringPage<Movie>>();

  useEffect(() => {
    getMovies(0);
  }, []);

  const getMovies = (pageNumber: number) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + '/movies',
      headers: {
        Authorization: `Bearer ${getAuthData().access_token}`,
      },
      params: {
        page: pageNumber,
        size: 4,
      },
    };

    requestBackend(config).then((response) => {
      setMovies(response.data);
    });
  };

  return (
    <div className="container my-4 movies-container">
      <div className="row movie-filter-container">
        <Filter />
      </div>

      <div className="row list-movies">
        {movies?.content.map((movie) => (
          <div className="col-sm-6 col-lg-6 col-xl-3" key={movie.id}>
            <Link to={'/movies/' + movie?.id}>
              <MovieCard movies={movie} />
            </Link>
          </div>
        ))}
        <Pagination pageCount={movies ? movies.totalPages : 0} range={3} onChange={getMovies}/>
      </div>
    </div>
  );
};

export default SelectMovies;
