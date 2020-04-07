import React, { useState, useContext } from 'react';
import ctx from './context';
import Moment from 'moment';
const Edit = ({ post }) => {
  const { context, dispatch } = useContext(ctx);
  const [state, setState] = useState({
    edit: false,
    id: post.id,
    title: post.title,
    body: post.body,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  });
  const edit = e => {
    setState({ ...state, edit: !state.edit });
  };

  const update = async () => {
    try {
      const post = { id: state.id, title: state.title, body: state.body };
      const req = await fetch('/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
      });
      const res = await req.json();
      console.log(res);
      if (res) {
        setState({ ...state, edit: false });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const remove = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      const req = await fetch('/posts/' + state.id, { method: 'delete' });
      const res = await req.json();
      if (!res.msg) {
        dispatch({ type: 'REMOVE_POST', id: state.id });
        setState({ ...state, edit: false });
      }
    }
  };

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return state.edit ? (
    <>
      <div>
        <br />
        <div className="container" style={{ textAlign: 'left' }}>
          <h4>
            {Moment(state.createdAt).format('MMMM Do YYYY, h:mm a') + ','}
          </h4>
        </div>
        <div className="form-group">
          <input name="title" value={state.title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <textarea name="body" value={state.body} onChange={handleChange} />
        </div>
        <div className="container" style={{ textAlign: 'left' }}>
          <small>
            {state.createdAt == state.updatedAt
              ? ''
              : 'Edited: ' +
                Moment(state.updatedAt).format('MMMM Do YYYY, h:mm a')}
          </small>
        </div>
        <br />
        <button className={'btn btn-primary'} onClick={update}>
          Update
        </button>{' '}
        <button className={'btn btn-danger'} onClick={remove}>
          Delete
        </button>{' '}
        <button className={'btn btn-warning'} onClick={edit}>
          Cancel
        </button>
        <hr style={{ width: '100%' }} />
      </div>
    </>
  ) : (
    <>
      <div>
        <div className="container" style={{ textAlign: 'left' }}>
          <br />
          <h4>
            {Moment(state.createdAt).format('MMMM Do YYYY, h:mm a') + ','}
          </h4>
          <br />
          <h1 className="text title">{state.title}</h1>
          <br />
          <p className="text body">{state.body}</p>
          <br />
          <small>
            {state.createdAt == state.updatedAt
              ? ''
              : 'Edited: ' +
                Moment(state.updatedAt).format('MMMM Do YYYY, h:mm a')}
          </small>
          <br />
        </div>
        <button className={'btn btn-warning'} onClick={edit}>
          Edit
        </button>
        <hr style={{ width: '100vw' }} />
      </div>
    </>
  );
};

export default Edit;
