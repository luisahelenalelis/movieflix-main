import { AxiosRequestConfig } from 'axios';
import MovieCard from 'components/MovieCard';
import Pagination from 'components/Pagination';
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from 'types/movies';
import { SpringPage } from 'types/spring-page';
import { BASE_URL, requestBackend } from 'util/requests';
import { getAuthData } from 'util/storage';
import Filter, { MovieFilterData } from 'components/Filter';

import './styles.css';

type ControlComponentsData = {
  activePage: number;
  filterData: MovieFilterData;
};

const SelectMovies = () => {
  const [movies, setMovies] = useState<SpringPage<Movie>>();

  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      filterData: { name: '', genres: null },
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      filterData: controlComponentsData.filterData,
    });
  };

  const handleSubmitFilter = (data: MovieFilterData) => {
    setControlComponentsData({ activePage: 0, filterData: data });
  };

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: BASE_URL + '/movies',
      headers: {
        Authorization: `Bearer ${getAuthData().access_token}`,
      },
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.filterData.genres?.id,
      },
    };

    requestBackend(config).then((response) => {
      setMovies(response.data);
      console.log(response.data)
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <div className="container my-4 movies-container">
      <div className="row movie-filter-container">
        <Filter onSubmitFilter={handleSubmitFilter} />
      </div>

      <div className="row list-movies">
        {movies?.content.map((movie) => (
          <div className="col-sm-6 col-lg-6 col-xl-3" key={movie.id}>
            <Link to={'/movies/' + movie?.id}>
              <MovieCard movies={movie} />
            </Link>
          </div>
        ))}
        <Pagination
          forcePage={movies?.number}
          pageCount={movies ? movies.totalPages : 0}
          range={3}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default SelectMovies;
