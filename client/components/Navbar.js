import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Context from './context';

const Navbar = () => {
  const { context, dispatch } = useContext(Context);
  const logout = async () => {
    try {
      let req = await fetch('/user/logout');
      let res = req.json();
      if (res.errors) {
        dispatch({ type: 'MESSAGE', messages: res.errors });
      } else {
        await dispatch({ type: 'LOGOUT' });
        await dispatch({
          type: 'MESSAGE',
          messages: [{ msg: 'Successfully Logged out' }]
        });
        setTimeout(() => {
          dispatch({ type: 'MESSAGE', messages: [] });
        }, 7000);
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#">
        Nick's Blog
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navigation"
        aria-controls="navigation"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navigation">
        {/* <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
        </ul> */}

        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
          {context.user ? (
            <>
              <li onClick={() => logout()}>
                <Link className="nav-link" to="/">
                  Logout
                </Link>
              </li>
              {/* <li>
                <Link className="nav-link" to="/Profile">
                  Profile
                </Link>
              </li> */}
            </>
          ) : (
            <>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://github.com/nbisigna"
                  target="_blank"
                >
                  <i className="fab fa-github fa-lg" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="http://linkedin.com/in/nbisigna"
                  target="_blank"
                >
                  <i className="fab fa-linkedin fa-lg" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.npmjs.com/~nbisigna"
                  target="_blank"
                >
                  <i className="fab fa-npm fa-lg" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.instagram.com/nickbisignano/"
                  target="_blank"
                >
                  <i className="fab fa-instagram-square fa-lg" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://www.youtube.com/channel/UCcNI3QYJA2VeidzV-39UbMA"
                  target="_blank"
                >
                  <i className="fab fa-youtube-square fa-lg" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://twitter.com/nickbisignano"
                  target="_blank"
                >
                  <i className="fab fa-twitter fa-lg" />
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="https://facebook.com/nick.bisignano7/"
                  target="_blank"
                >
                  <i className="fab fa-facebook-square fa-lg" />
                </a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
