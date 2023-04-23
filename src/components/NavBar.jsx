import { Link } from "react-router-dom";
import UserLogin from "./UserLogin.jsx";

const NavBar = ({ currentUser, users, setCurrentUser }) => {
  const handleLoginClick = () => {
    if (currentUser) {
      setCurrentUser(undefined);
    }
  };

  const loginBtn = (
    <button onClick={handleLoginClick}>
      {currentUser ? `Logout` : `Login`}
    </button>
  );
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link to={`/users`}>Users</Link>
        </li>
        <li>
          <UserLogin currentUser={currentUser} users={users} />
        </li>
        <li>
          {!currentUser ? (
            <Link to={`/users`}>{loginBtn}</Link>
          ) : (
            <>{loginBtn}</>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
