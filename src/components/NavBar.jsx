import { Link } from "react-router-dom";
import UserLogin from "./UserLogin.jsx";
import img from "../assets/speechbubble.png"

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
        <div className="flex lg:flex-1">
          {/* <a href="#" className="-m-1.5 p-1.5"> */}
          {/* <span className="sr-only">Your Company</span> */}
          <img
            className="h-11 w-auto"
            src={img}
            alt="Nicoles News logo"
          />
          <h1 className="text-3xl font-bold">Nicole's NC-News</h1>

          {/* </a> */}
        </div>
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
    </header>
  );
};

export default NavBar;
