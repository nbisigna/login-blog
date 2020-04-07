import React, { useContext } from 'react';
import ctx from './context';

const Pages = () => {
  const { context, dispatch } = useContext(ctx);

  const setPage = e => {
    dispatch({ type: 'SET_PAGE', page: Number(e.target.name) });
    let scroll = window.scrollY;
    setTimeout(function() {
      window.scroll({ top: scroll });
    }, 0);
  };
  return (
    <nav>
      <ul className="pagination pagination-lg justify-content-center">
        <li className={'page-item' + (context.page <= 1 ? ' disabled' : '')}>
          <a
            className="page-link text-dark  "
            onClick={setPage}
            name={context.page - 1}
            href="#"
          >
            Previous
          </a>
        </li>
        {Array(Math.ceil(context.length / context.offset))
          .fill()
          .map((_, i) => (
            <li key={i + 1} className="page-item">
              <a
                onClick={setPage}
                name={i + 1}
                className={
                  'page-link' +
                  (i + 1 === context.page
                    ? ' text-white bg-dark'
                    : ' text-dark')
                }
                href="#"
              >
                {i + 1}
              </a>
            </li>
          ))}
        <li
          className={
            'page-item' +
            (context.page >= Math.ceil(context.length / context.offset)
              ? ' disabled'
              : '')
          }
        >
          <a
            onClick={setPage}
            name={context.page + 1}
            className="page-link text-dark"
            href="#"
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Pages;
