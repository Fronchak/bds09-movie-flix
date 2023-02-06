import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, useSubmit, ActionFunctionArgs, useActionData, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import HomeImage from '../../assets/imgs/home-banner.svg';
import { LoginForm } from '../../types/domain/LoginForm';
import { requestBackendLogin } from '../../util/request';
import { saveAuthData } from '../../util/storage';
import './styles.css';

export const action = async({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData();
    const loginForm = Object.fromEntries(formData) as LoginForm;
    const response = await requestBackendLogin(loginForm);
    saveAuthData(response.data);
    toast.success('Logado com sucesso', {
      position: 'bottom-right',
      theme: 'dark',
      autoClose: 3000
    });
    return redirect('/movies');
  }
  catch(e) {
    let error = e as any;
    if(error.response.request.status === 400) {
      return {
        error: 'Usuário ou senha inválidos'
      }
    }
    throw e;
  }

}

type ActionData = {
  error: string;
}

const Login = () => {

  const [wasSubmit, setWasSubmit] = useState<boolean>(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const submit = useSubmit();
  const actionData = useActionData() as ActionData | undefined;
  const error = actionData ? actionData.error : undefined;

  const onSubmit = async() => {
    console.log('onSubmit');
    const form = document.getElementById('login-form') as HTMLFormElement;;
    submit(form);
  }

  return (
    <div className="container p-2 p-sm-3" id="login-page-container">
      <div className="row h-100">
        <div className="col-12 px-5 col-lg-6 d-none d-lg-block">
          <div className="px-5">
            <h1 className="my-5 fw-bold">Avalie Filmes</h1>
            <p className="fourth-color mb-5">Diga o que você achou do seu<br />filme favorito</p>
          </div>
          <img src={ HomeImage } alt="Home Banner" className="img-fluid" />
        </div>
        <div className="col-12 col-lg-6">
          <div className="base-card px-3 px-sm-4 px-md-5">
            <h2 className="mb-5 text-center">Login</h2>
            { error && (
              <div className="alert alert-danger py-2" role="alert">
                { error }
              </div>

            )}
            <Form method='post' onSubmit={handleSubmit(onSubmit)} id="login-form">
              <div className="mb-3">
                <input
                  { ...register('username', {
                    required: 'Campo obrigatório',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Email inválido'
                    }
                  }) }
                  type="email"
                  id="username"
                  name="username"
                  className={`form-control ${wasSubmit ? (errors.username ? 'is-invalid' : 'is-valid') : ''}`}
                  placeholder="Email"
                />
                <div className="invalid-feedback d-block">
                  { errors.username?.message }
                </div>
              </div>
              <div className="mb-5">
                <input
                  { ...register('password', {
                    required: 'Campo obrigatório',
                    minLength: {
                      value: 6,
                      message: 'Senha deve possuir pelo menos 6 caracteres'
                    }
                  }) }
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control ${wasSubmit ? (errors.password ? 'is-invalid' : 'is-valid') : ''}`}
                  placeholder="Senha"
                />
                <div className="invalid-feedback d-block">
                  { errors.password?.message }
                </div>
              </div>
              <button className="btn base-btn" type="submit" onClick={() => setWasSubmit(true)}>Fazer login</button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
