import { Navigate, Outlet, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { isAuthenticated } from '../../util/auth';

export const loader = () => {
  console.log('No loader do AuthenticatedPrivateRoute');
  const authenticated = isAuthenticated();
  if(authenticated) return null;
  toast.info('Você precisa estar logado para acessar esse conteúdo');
  return redirect('/')
}

const AuthenticatedPrivateRoute = () => {
  console.log('No AuthenticatedPrivateRoute');
  const authenticated = isAuthenticated();
  if(authenticated) {
    return <Outlet />
  }
  else {
    toast.info('Você precisa estar logado para acessar esse conteúdo');
    return <Navigate to="/" replace />
  }
}

export default AuthenticatedPrivateRoute;
