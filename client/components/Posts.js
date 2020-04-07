import React, { useEffect, useContext } from 'react';
import ctx from './context';
import Post from './Post';
import Edit from './Edit';

const Posts = () => {
  const { context, dispatch } = useContext(ctx);

  const get = async () => {
    const json = await fetch('/posts');
    const res = await json.json();
    await dispatch({ type: 'SET_POSTS', posts: res });
  };

  useEffect(() => {
    get();
  }, []);

  const { page, offset, length } = context;

  return context.user ? (
    <div className="posts">
      {context.posts
        .slice(-offset * page, page - 1 ? -offset * (page - 1) : length)
        .map(post => (
          <Edit key={post.id} post={post} />
        ))}
    </div>
  ) : (
    <div className="posts">
      {context.posts
        .slice(-offset * page, page - 1 ? -offset * (page - 1) : length)
        .map(post => (
          <Post key={post.id} post={post} />
        ))}
    </div>
  );
};

export default Posts;
