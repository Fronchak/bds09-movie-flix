import HomeImage from '../../assets/imgs/home-banner.svg';
import './styles.css';

const Login = () => {
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
            <form method="post">
              <div className="mb-3">
                <input
                  type="email"
                  id="username"
                  name="username"
                  className={`form-control`}
                  placeholder="Email"
                />
              </div>
              <div className="mb-5">
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-control`}
                  placeholder="Senha"
                />
              </div>
              <button className="btn base-btn" type="submit">Fazer login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
