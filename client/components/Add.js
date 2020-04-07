import React, { useState, useContext } from 'react';
import ctx from './context';

const Add = () => {
  const { context, dispatch } = useContext(ctx);
  const [state, setState] = useState({ title: '', body: '' });

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const add = async () => {
    if (state.title.length != 0 && state.body.length != 0) {
      let req = await fetch('/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(state)
      });
      let post = await req.json();
      if (!post.msg) {
        dispatch({ type: 'SET_POSTS', posts: [...context.posts, post] });
        setState({ title: '', body: '' });
      }
    }
  };
  return (
    <>
      <form>
        <div className="form-group">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={state.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <textarea
            name="body"
            rows="6"
            placeholder="Body"
            value={state.body}
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
      <button className={'btn btn-secondary'} onClick={add}>
        Add
      </button>
      <hr />
    </>
  );
};

export default Add;
