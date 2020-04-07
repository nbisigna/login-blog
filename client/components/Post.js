import React from 'react';
import Moment from 'moment';

const Post = ({ post }) => (
  <>
    <div>
      <div className="container" style={{ textAlign: 'left' }}>
        <br />
        <h4>{Moment(post.createdAt).format('MMMM Do YYYY, h:mm a') + ','}</h4>
        <br />
        <h1 className="text title">{post.title}</h1>
        <br />
        <p className="text body">{post.body}</p>
        <br />
        <small>
          {post.createdAt == post.updatedAt
            ? ''
            : 'Edited: ' +
              Moment(post.updatedAt).format('MMMM Do YYYY, h:mm a')}
        </small>
      </div>
      <hr style={{ width: '100vw' }} />
    </div>
  </>
);

export default Post;
