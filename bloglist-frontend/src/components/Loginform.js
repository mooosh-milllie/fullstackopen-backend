import React, { useState } from 'react';


const LoginForm = ({ loginUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginHandler = async (e) => {
    e.preventDefault();
    console.log('about to sign you in');

    loginUser({
      username: username,
      password: password
    });
  };

  return (
    <form onSubmit={loginHandler}>
      <label>
            username
        <input
          id='username'
          type={'text'}
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </label>
      <label>
            password
        <input
          id='password'
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </label>
      <button id='login-btn' type='submit'>login</button>
    </form>
  );
};

export default LoginForm;