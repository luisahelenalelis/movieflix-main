import { Link } from 'react-router-dom';
import { getTokenData, isAuthenticated } from 'util/auth';
import { useContext, useEffect } from 'react';
import history from 'util/history';
import { AuthContext } from 'AuthContext';

import './styles.css';
import { removeAuthData } from 'util/storage';

const Navbar = () => {

const { authContextData, setAuthContextData } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated()) {
      setAuthContextData({
        authenticated: true,
        tokenData: getTokenData(),
      });
    } else {
      setAuthContextData({
        authenticated: false,
      });
    }
  }, [setAuthContextData]);

  const handleLogoutClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    removeAuthData();
    setAuthContextData({
      authenticated: false,
    });
    history.replace('/');
  };

  return (
    <nav className="bg-primary main-nav">
      <div className="container-nav">
        <Link to="/">
          <h4>MovieFlix</h4>
        </Link>
        {authContextData.authenticated ? (
          <div className="navbar-login-logout">
            <Link to={'/'} onClick={handleLogoutClick}>
              Sair
            </Link>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
