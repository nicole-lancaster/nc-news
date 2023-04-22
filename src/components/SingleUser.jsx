import { useState } from "react";

const SingleUser = ({
  user,
  currentUser,
  setCurrentUser,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = (user) => {
    setIsLoading(true);
    setCurrentUser(user);
    setIsLoading(false);
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
      <button onClick={() => handleLoginClick(user)} disabled={user.username === currentUser?.username}>
        Pretend to be {user.name}
      </button>
      {currentUser ===  user ? <p>You are now logged in as {user.name}!</p> : null}
    </div>
  );
};
export default SingleUser;
