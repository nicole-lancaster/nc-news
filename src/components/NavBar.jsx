import { Link } from "react-router-dom";
import UserLogin from "./UserLogin.jsx";
import {
  HomeIcon,
  UsersIcon,
  ArrowLongRightIcon, ArrowLongLeftIcon
} from "@heroicons/react/24/outline";

const NavBar = ({ currentUser, users, setCurrentUser }) => {
  
  const handleLogoutClick = () => {
    if (currentUser) {
      setCurrentUser(undefined);
    }
  };

  return (
    <header>
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <h1 className="text-3xl font-bold">Nicole's NC-News</h1>
        <ul>
          <li>
            <Link
              className="text-sm font-semibold leading-6 text-gray-900"
              to="/"
            >
              <HomeIcon className="h-8 w-8 text-black-500" />
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-sm font-semibold leading-6 text-gray-900"
              to="/users"
            >
              <UsersIcon className="h-8 w-8 text-black-500" />
              Users
            </Link>
          </li>
          <li>
            <UserLogin currentUser={currentUser} users={users} />
            {!currentUser ? (
              <>
                <Link className="text-sm font-semibold leading-6 text-gray-900" to={`/users`}>
                  Login
                <ArrowLongRightIcon className="h-8 w-8 text-black-500" />
                </Link>
              </>
            ) : (
              <p className="text-sm font-semibold leading-6 text-gray-900" onClick={handleLogoutClick}>Logout
              <ArrowLongLeftIcon className="h-8 w-8 text-black-500" /></p>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavBar;
