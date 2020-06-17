import React, { useState, useContext } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Loader from 'react-loader-spinner';
import { FriendsContext } from '../contexts/FriendsContext';

export default function Login(props) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const { getFriends, setFriends } = useContext(FriendsContext);

  const handleChange = (evt) => {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
  };

  const login = (evt) => {
    evt.preventDefault();
    setIsLoading(true);
    axiosWithAuth()
      .post('/api/login', credentials)
      .then((res) => {
        window.localStorage.setItem('token', res.data.payload);
        setFriends([]);
        getFriends();
        props.history.push('/friends');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button>Log in</button>
        {isLoading === true && (
          <Loader type="Hearts" color="plum" height={150} width={150} />
        )}
      </form>
    </div>
  );
}
