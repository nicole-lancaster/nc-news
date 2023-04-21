import { useState, useEffect } from "react";

const SingleUser = ({ user, currentUser, setCurrentUser, setIsLoggedIn, isLoggedIn }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleLoginClick = (user) => {
    console.log(user)

    setDisabled(true);
    setIsLoggedIn(true)
    setCurrentUser(user)
  };

  if (isLoading) return <p>Logging in...</p>;

  return (
    <div className="single-user">
      <li>
        {user.name}
        <p>username: {user.username}</p>
        <img
          className="user-list-avatar"
          src={user.avatar_url}
          alt={user.username}
        />
      </li>
      <button onClick={(user) => handleLoginClick(user)} disabled={disabled}>
        Pretend to be {user.name}
      </button>
      {disabled ? <p>You are now logged in as {user.name}</p> : null}
    </div>
  );
};
export default SingleUser;
