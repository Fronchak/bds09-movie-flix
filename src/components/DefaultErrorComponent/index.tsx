import { useRouteError } from 'react-router-dom';

const DefaultErrorComponent = () => {
  const error = useRouteError() as any;

  return (
    <div className="container text-center mt-5 p-2 p-sm-3 p-md-4 p-lg-5">
      <div className="alert alert-danger" role="alert">
        <h1 className="alert-heading">Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <hr />
        <p className="mb-0">{error.statusText || error.message}</p>
      </div>
    </div>
  );
}

export default DefaultErrorComponent;
