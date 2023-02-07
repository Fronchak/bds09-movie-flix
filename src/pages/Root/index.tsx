import { Outlet, useLoaderData } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { isAuthenticated } from '../../util/auth';

export const loader = () => {
  const authenticated = isAuthenticated();
  return { authenticated };
}

type Loader = {
  authenticated: boolean;
}

const Root = () => {

  const { authenticated } = useLoaderData() as Loader;

  return (
    <>
      <Navbar authenticated={ authenticated } />
      <Outlet />
    </>
  );
}

export default Root;
