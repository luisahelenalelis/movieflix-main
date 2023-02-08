import axios, { AxiosRequestConfig } from 'axios';
import { useForm } from 'react-hook-form';
import { Review } from 'types/review';
import { BASE_URL } from 'util/requests';
import { getAuthData } from 'util/storage';

import './styles.css';

type Props = {
  movieId: string;
  onInsertReview: (review: Review) => void;
};

type FormDataReview = {
  text: string;
  movieId: number;
};

const FormReview = ({ movieId, onInsertReview }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<FormDataReview>();

  const onSubmit = (formDataReview: FormDataReview) => {
    formDataReview.movieId = parseInt(movieId);

    console.log(formDataReview);

    const params: AxiosRequestConfig = {
      method: 'POST',
      url: BASE_URL + '/reviews',
      data: formDataReview,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getAuthData().access_token}`,
      },
    };

    axios(params)
      .then((response) => {
        setValue('text', '');
        onInsertReview(response.data);
        console.log('Sucesso', response);
      })
      .catch((error) => {
        console.log('Erro', error);
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="base-card product-details-card">
        <input
          {...register('text', {
            required: 'Campo obrigatório!',
          })}
          type="text"
          className="form-control base-input"
          placeholder="Deixe sua avaliação aqui"
          name="text"
        />
        <div className="invalid-feedback d-block">{errors.text?.message}</div>
        <div className="details-submit">
          <button type="submit" className="review-submit">
            Salvar Avaliação
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormReview;
