import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import FriendsList from './components/FriendsList';
import Login from './components/Login';
import AddFriend from './components/AddFriend';
import { axiosWithAuth } from './utils/axiosWithAuth';
import { FriendsContext } from './contexts/FriendsContext';

function App() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(false);

  const getFriends = () => {
    setLoading(true);
    axiosWithAuth()
      .get('/api/friends')
      .then((res) => {
        setFriends(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getFriends();
  }, []);

  const postNewFriend = (friend) => {
    axiosWithAuth()
      .post('/api/friends', friend)
      .then((res) => {
        setFriends([]);
        getFriends();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteFriend = (id) => {
    axiosWithAuth()
      .delete(`/api/friends/${id}`)
      .then((res) => {
        setFriends([]);
        getFriends();
      });
  };

  return (
    <BrowserRouter>
      <FriendsContext.Provider
        value={{
          setFriends,
          getFriends,
          friends,
          loading,
          postNewFriend,
          deleteFriend,
        }}
      >
        <div className="App">
          <header className="app-header">
            <h3>FriendsList 🧑‍🤝‍🧑</h3>
            <Link className="nav" to="/">
              Home
            </Link>
            <Link className="nav" to="/Login">
              Login
            </Link>
            <Link className="nav" to="/Friends">
              Friends
            </Link>
          </header>
        </div>
        <div className="main-content">
          <Switch>
            <PrivateRoute path="/friends" component={FriendsList} />
            <PrivateRoute path="/add-friend" component={AddFriend} />
            <Route path="/login" component={Login} />
            <Route exact path="/">
              <h1>Welcome to FriendsList</h1>
              <h3>
                See all your friends at once, from the safety of your own home!
              </h3>
              <p>
                💜 Navigate the site using the links above. Click Login to get
                started! 💜
              </p>
            </Route>
          </Switch>
        </div>
      </FriendsContext.Provider>
    </BrowserRouter>
  );
}

export default App;
