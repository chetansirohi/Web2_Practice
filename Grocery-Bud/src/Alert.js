import React, { useEffect } from 'react';

const Alert = ({ type, msg, removeAlert, list }) => {
  // alert for 3 sec and then cleanup, side effect wehn changes made to the list
  useEffect(() => {
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [list]);
  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
