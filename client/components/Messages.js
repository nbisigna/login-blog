import React, { useContext } from 'react';
import Context from './context.js';

const Messages = () => {
  const { context, dispatch } = useContext(Context);

  const handlePress = async ind => {
    let msgs = context.messages.filter((msg, i) => i != ind);
    dispatch({ type: 'MESSAGE', messages: msgs });
  };

  return (
    <>
      {context.messages.map((msg, ind) => (
        <div key={ind}>
          {msg.msg + ' '}{' '}
          <button
            className="btn btn-success"
            style={{ cursor: 'pointer' }}
            onClick={() => handlePress(ind)}
          >
            X
          </button>
        </div>
      ))}
    </>
  );
};

export default Messages;
