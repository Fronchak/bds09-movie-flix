import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  LoaderFunctionArgs,
  ActionFunctionArgs,
  useLoaderData,
  Form,
  useSubmit,
  redirect,
  useNavigation,
  useActionData
} from 'react-router-dom';
import { toast } from 'react-toastify';
import MovieDetailsCard from '../../components/MovieDetailsCard';
import ReviewComponent from '../../components/ReviewComponent';
import { Movie } from '../../types/domain/Movie';
import { Review } from '../../types/domain/Review';
import { ValidationError } from '../../types/vendor/ValidationError';
import { hasAnyRole, isAuthenticated } from '../../util/auth';
import { requestBackend } from '../../util/request';
import './styles.css';

export const action = async({ params, request }: ActionFunctionArgs) => {
  console.log('no início do action');

  if(!isAuthenticated()) {
    toast.info('É necessário estar logado para postar reviews');
    return redirect('/');
  }

  if(!hasAnyRole(['ROLE_MEMBER'])) {
    toast.info('Somente usuários membros podem postar reviews');
    return null;
  }

  const formData = await request.formData();
  const movieId = params.id;
  const obj = Object.fromEntries(formData);
  const data = { ...obj, movieId };

  const config: AxiosRequestConfig = {
    method: 'post',
    url: '/reviews',
    data,
    withCredentials: true
  }
  try {
    await requestBackend(config);
    toast.success('Review salva com sucesso!');
    return null;
  }
  catch(e) {
    console.log('No error do action');
    const error = e as any;
    const status = error?.request?.status as number | undefined;

    if(status && status == 401) {
      toast.info('É necessário estar logado para postar reviews');
      return redirect('/');
    }

    if(status && status === 403) {
      toast.error('Você não tem permissão para adicionar reviews');
      return null;
    }

    if(status && status === 422) {
      toast.error('Erro ao salvar review');
      return {
        validationError: error?.response?.data
      };

    }

    throw e;
  }

}

export const loader = async({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const movieConfig: AxiosRequestConfig = {
    method: 'get',
    url: `/movies/${ id }`,
    withCredentials: true
  };
  const movieResponse = await requestBackend(movieConfig);
  const movie = movieResponse.data;

  const reviewsConfig: AxiosRequestConfig = {
    method: 'get',
    url: `/movies/${ id }/reviews`,
    withCredentials: true
  }
  const reviewsResponse = await requestBackend(reviewsConfig);
  const reviews = reviewsResponse.data;
  return { movie, reviews }
}

type Loader = {
  movie: Movie;
  reviews: Review[]
}

type ReviewForm = {
  text: string;
}

type ActionData = {
  validationError: ValidationError;
}

const MoviePage = () => {

  const [ wasSubmit, setWasSubmit ] = useState<boolean>();
  const { movie, reviews } = useLoaderData() as Loader;
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<ReviewForm>();
  const submit = useSubmit();
  const navigation = useNavigation();
  const actionData = useActionData() as ActionData | undefined;
  const fieldError =
      actionData ? actionData.validationError.errors.filter((fieldError) => fieldError.fieldName === 'text') : [];
  const serverError = fieldError.length > 0 ? fieldError[0].message : '';

  const onSubmit = () => {
    console.log('onSubmit');
    const form = document.getElementById('review-form') as HTMLFormElement;
    submit(form);
    setWasSubmit(false);
    setValue('text', '');
  }

  return (
    <div className="container py-3" id="movie-page-container">
      <MovieDetailsCard movie={movie} />
      { hasAnyRole(['ROLE_MEMBER']) && (
      <div className="p-3 mt-3 base-card">
        <Form method='post' onSubmit={handleSubmit(onSubmit)} id="review-form">
          <div className="mb-3">
            <input
            { ...register('text', {
              required: 'Campo obrigatório',
              pattern: {
                value: /[\S]+/,
                message: `A avaliação não pode estar em branco`
              }
            }) }
            type="text"
            name="text"
            id="text"
            placeholder='Deixe sua avaliação aqui'
            defaultValue={''}
            className={`form-control ${ wasSubmit ? errors.text ? 'is-invalid' : 'is-valid' : '' }`}
            />
            <div className="invalid-feedback d-block">
              { serverError || errors.text?.message }
            </div>
          </div>
          <div id="review-form-button-container">
            <button
              className="btn base-btn"
              type='submit'
              onClick={() => setWasSubmit(true)}
              >Salvar avaliação
              { navigation.state === 'loading' && (
                <div className="spinner-border spinner-border-sm mx-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              ) }
            </button>
          </div>
        </Form>
      </div>
      ) }

      { reviews.length > 0 ? (
        <div className="px-3 mt-3 pb-3 pt-1 base-card">
          { reviews.map((review) => (
            <div className="mb-1" key={review.id}>
              <ReviewComponent review={review} />
            </div>
          )) }
        </div>
      ) : (
        <div className="p-3 mt-3 base-card">
          <p className="mb-0 fs-4">Esse filme ainda não possui nenhuma review</p>
        </div>
      ) }
    </div>
  );
}

export default MoviePage;
