import React, { useReducer, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

const Errors = lazy(() => import('./components/Messages'));

const Posts = lazy(async () => {
  return Promise.all([
    import('./components/Posts'),
    new Promise(resolve => setTimeout(resolve, 1000))
  ]).then(([moduleExports]) => {
    return moduleExports;
  });
});

import Navbar from './components/Navbar';
import Pages from './components/Pages';
import Footer from './components/Footer';
import Add from './components/Add';

import Private from './components/Private';
import Loading from './components/Loading';
import auth from './components/auth';

import Context from './components/context.js';
import reducer from './components/reducer.js';

const { Provider } = Context;

const initialState = {
  user: null,
  timeout: null,
  messages: [],
  posts: [],
  offset: 6,
  page: 1,
  length: 0
};

const expires = localStorage.getItem('expires');

const App = () => {
  const [context, dispatch] = useReducer(reducer, initialState);

  if (expires) {
    useEffect(() => {
      auth(dispatch);
      let diff = new Date(expires) - new Date().getTime();
      // console.log(diff);
      setTimeout(function() {
        localStorage.removeItem('expires');
        window.location.reload(false);
      }, diff);
    }, []);
  }

  return (
    <>
      <Provider value={{ context, dispatch }}>
        <Router basename={'/'}>
          <Navbar />
          <Suspense fallback={<Loading />}>
            <Errors />
            <Pages />
            <hr />
            <Private path="/" user={context.user} component={Add} />
            <Posts />
            <Pages />
            <Footer />
          </Suspense>
        </Router>
      </Provider>
    </>
  );
};
export default App;
