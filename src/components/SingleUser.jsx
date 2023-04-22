import { useState } from "react";

const SingleUser = ({ user, currentUser, setCurrentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = (user) => {
    setIsLoading(true);
    setCurrentUser(user);
    setIsLoading(false);
  };

  if (isLoading) return <p>Logging in...</p>;

  return (
    <div className="single-user">
      <li className="single-user-name">
        {user.name}
        <p className="single-user-username">{user.username}</p>
        <img
          className="user-list-avatar"
          src={user.avatar_url}
          alt={user.username}
        />
      </li>
      <button
        className="user-pretend-to-be-btn"
        onClick={() => handleLoginClick(user)}
        disabled={user.username === currentUser?.username}
      >
        Pretend to be {user.name}
      </button>
      {currentUser === user ? (
        <p className="user-logged-in-as-msg">
          You are now logged in as {user.name}!
        </p>
      ) : null}
    </div>
  );
};
export default SingleUser;
