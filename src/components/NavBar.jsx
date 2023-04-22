import { Link } from "react-router-dom";
import UserLogin from "./UserLogin";

const NavBar = ({ currentUser, users }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to={`/`}>Home</Link>
        </li>
        <li>
          <Link>Topics</Link>
        </li>
        <li>
          <Link to={`/users`}>Users</Link>
        </li>
        <li>
          <Link>Contact me</Link>
        </li>
        <li>
          <Link to={`/users`}>
            <UserLogin currentUser={currentUser} users={users} />
          </Link>
          <Link to={`/users`}>
            <button hidden={currentUser}>Login</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
