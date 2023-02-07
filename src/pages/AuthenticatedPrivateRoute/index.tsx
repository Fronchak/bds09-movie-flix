import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../../util/auth';

const AuthenticatedPrivateRoute = () => {
  if(isAuthenticated()) {
    return <Outlet />
  }
  else {
    toast.info('Você precisa estar logado para acessar esse conteúdo');
    return <Navigate to="/" />
  }
}

export default AuthenticatedPrivateRoute;
