import { ReactComponent as MainImage } from 'assets/images/main-image.svg';
import { Route, Switch } from 'react-router-dom';
import Login from './Login';

import './styles.css';

const Auth = () => {
  return (
    <div className="auth-container">
      <div className="auth-banner-container">
        <h1>Avalie Filmes</h1>
        <p>Diga o que você achou do seu filme favorito.</p>
        <MainImage />
      </div>
      <div className="auth-form-container">
        <Switch>
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
