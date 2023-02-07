import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom';
import DefaultErrorComponent from './components/DefaultErrorComponent';
import DefaultErrorPage from './pages/DefaultErrorPage';
import Login, { action as LoginAction } from './pages/Login';
import Movies, { loader as moviesLoader } from './pages/Movies';
import Root, { loader as RootLoader } from './pages/Root';
import Logout, {loader as logoutLoader} from './pages/Logout';
import MoviePage, { loader as moviePageLoader, action as saveReviewAction } from './pages/MoviePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthenticatedPrivateRoute from './pages/AuthenticatedPrivateRoute';

const router = createBrowserRouter (
  createRoutesFromElements (
    <Route
      path="/"
      element={ <Root /> }
      loader={ RootLoader }
      errorElement={ <DefaultErrorPage /> }
    >
      <Route errorElement={ <DefaultErrorComponent /> }>
        <Route
          index={ true }
          element={ <Login /> }
          action={ LoginAction }
        />
        <Route
          element={ <AuthenticatedPrivateRoute /> }
          path='movies'
        >
          <Route
            element={ <Movies /> }
            loader={ moviesLoader }
          />
        </Route>
        <Route
          element={ <AuthenticatedPrivateRoute /> }
          path='movies/:id'
        >
          <Route
            element={ <MoviePage /> }
            loader={ moviePageLoader }
            action={ saveReviewAction }
          />
        </Route>
        <Route
          path="/logout"
          loader={ logoutLoader }
          element={ <Logout /> }
        />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer
      theme='dark'
      position='bottom-right'
      autoClose={3000}
    />
  </React.StrictMode>,
)
