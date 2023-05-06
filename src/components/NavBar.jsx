import { Link } from "react-router-dom";
import UserLogin from "./UserLogin.jsx";
import { HomeIcon, UsersIcon } from "@heroicons/react/24/outline";

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
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <h1 className="text-3xl font-bold">Nicole's NC-News</h1>
        <ul>
          <li>
            <Link className="nav-links" to="/">
              <HomeIcon className="h-8 w-8 text-black-500" />
              Home
            </Link>
          </li>
          <li>
            <Link className="nav-links" to="/users">
              <UsersIcon className="h-8 w-8 text-black-500" />
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
    </header>
  );
};

export default NavBar;
