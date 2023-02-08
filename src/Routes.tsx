import { Switch, Route, Router } from 'react-router-dom';
import Navbar from 'components/Navbar';
import Movies from 'pages/SelectMovie';
import Auth from 'pages/Home';
import Details from 'pages/MovieDetails';
import PrivateRoute from 'components/PrivateRoute';
import history from 'util/history';

const Routes = () => (
  <Router history={history}>
    <Navbar />
    <Switch>
      <Route path="/" exact>
        <Auth />
      </Route>
      <PrivateRoute path="/movies">
        <Route path="/movies" exact>
          <Movies />
        </Route>
        <Route path="/movies/:movieId">
          <Details />
        </Route>
      </PrivateRoute>
    </Switch>
  </Router>
);

export default Routes;
