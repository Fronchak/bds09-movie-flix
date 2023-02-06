import { AxiosRequestConfig } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { LoaderFunctionArgs, ActionFunctionArgs, useLoaderData, Form, useSubmit, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import MovieDetailsCard from '../../components/MovieDetailsCard';
import { Movie } from '../../types/domain/Movie';
import { requestBackend } from '../../util/request';
import './styles.css';

export const action = async({ params, request }: ActionFunctionArgs) => {
  const formData = await request.formData();

  const movieId = params.id;
  console.log(movieId);
  const obj = Object.fromEntries(formData);
  console.log(obj);
  const data = { ...obj, movieId };
  console.log(data);
  const config: AxiosRequestConfig = {
    method: 'post',
    url: '/reviews',
    data,
    withCredentials: true
  }
  try {
    const response = await requestBackend(config);
    toast.success('Review salva com sucesso!');
    return null;
  }
  catch(e) {
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

    throw e;
  }

}

export const loader = async({ params }: LoaderFunctionArgs) => {
  const id = params.id;
  const config: AxiosRequestConfig = {
    method: 'get',
    url: `/movies/${ id }`,
    withCredentials: true
  };
  const response = await requestBackend(config);
  const movie = response.data;
  return { movie }
}

type Loader = {
  movie: Movie;
}

type ReviewForm = {
  text: string;
}

const MoviePage = () => {

  const [ wasSubmit, setWasSubmit ] = useState<boolean>();
  const { movie } = useLoaderData() as Loader;
  const { register, handleSubmit, formState: { errors } } = useForm<ReviewForm>();
  const submit = useSubmit();

  const onSubmit = () => {
    console.log('onSubmit');
    const form = document.getElementById('review-form') as HTMLFormElement;;
    submit(form);
  }

  return (
    <div className="container py-3" id="movie-page-container">
      <MovieDetailsCard movie={movie} />
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
            className={`form-control`}
            />
            <div className="invalid-feedback d-block">
              { errors.text?.message }
            </div>
          </div>
          <div id="review-form-button-container">
            <button
              className="btn base-btn"
              type='submit'
              onClick={() => setWasSubmit(true)}
              >Salvar avaliação</button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default MoviePage;
