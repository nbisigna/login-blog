import React, { useState, useEffect } from 'react';
export default () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    let timeout = setTimeout(() => setShow(true), 300);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <>{show && <div className="loader" />}</>;
};
