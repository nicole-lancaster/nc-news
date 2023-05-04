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
    <nav className="nav-bar">
      <h1>Nicole's NC-News</h1>
      <ul>
        <li>
          <Link className="nav-links" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-links" to="/users">
            Users
          </Link>
        </li>
        <li>
          <UserLogin currentUser={currentUser} users={users} />
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
