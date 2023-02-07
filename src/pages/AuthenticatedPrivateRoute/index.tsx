import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../../util/auth';

const AuthenticatedPrivateRoute = () => {
  console.log('No AuthenticatedPrivateRoute');

  console.log('isAuthenticated()', isAuthenticated());

  if(isAuthenticated()) {
    return <Outlet />
  }
  else {
    toast.info('Você precisa estar logado para acessar esse conteúdo');
    return <Navigate to="/" />
  }

  //return <h1>Gello WOrd</h1>
}

export default AuthenticatedPrivateRoute;
