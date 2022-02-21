import React from 'react';
const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  const successStyle = {

    border: '2px solid green',
    borderRadius: 4 ,
    color: 'green',
    fontSize: 15,
    backgroundColor: 'gray',
    padding: 5,
    fontWeight: 'bolder'
  };

  return(
    <div style={successStyle}>
      <span>{message}</span>
    </div>
  );
};
const ErrorNotification = ({ message }) => {
  if (message === null) {
    return null;
  }
  const errorStyle = {

    border: '2px solid red',
    borderRadius: 4 ,
    color: 'rgb(255, 0, 0)',
    fontSize: 15,
    backgroundColor: 'gray',
    padding: 5,
    fontWeight: 'bolder'
  };

  return(
    <div className='error' style={errorStyle}>
      <span>{message}</span>
    </div>
  );
};

const notification = { Notification, ErrorNotification };


export default notification;