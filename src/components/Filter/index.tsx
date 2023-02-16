import Select from 'react-select';
import { useEffect, useState } from 'react';
import { Genres } from 'types/genres';
import { requestBackend } from 'util/requests';
import { Controller, useForm } from 'react-hook-form';

import './styles.css';

export type MovieFilterData = {
  name: string;
  genres: Genres | null;
};

type Props = {
  onSubmitFilter: (data: MovieFilterData) => void;
};

const Filter = ({onSubmitFilter} : Props) => {

  const [selectGenre, setSelectGenre] = useState<Genres[]>([]);

  const { handleSubmit, setValue, getValues, control } =
    useForm<MovieFilterData>();

  const onSubmit = (formData: MovieFilterData) => {
    onSubmitFilter(formData);
  };

  const handleChangeGenres = (value: Genres) => {
    setValue('genres', value);

    const obj: MovieFilterData = {
      name: getValues('name'),
      genres: getValues('genres'),
    };

    console.log(obj)
    onSubmitFilter(obj);
  };

  useEffect(() => {
    requestBackend({ withCredentials: true, url: '/genres' }).then(
      (response) => {
        console.log(response);
        setSelectGenre(response.data);
      });
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="movie-filter-genre-form">
      <div className="base-card movie-filter-genre-container">
        <div className="product-filter-category-container">
          <Controller
            name="genres"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={selectGenre}
                isClearable
                placeholder="Gênero"
                onChange={(value) => {
                  handleChangeGenres(value as Genres);
                }}
                classNamePrefix="movie-filter-genre-select"
                getOptionLabel={(genre: Genres) => genre.name}
                getOptionValue={(genre: Genres) => String(genre.id)}
              />
            )}
          />
        </div>
      </div>
    </form>
  );
};

export default Filter;
