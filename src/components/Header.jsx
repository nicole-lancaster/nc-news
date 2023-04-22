import UserLogin from "./UserLogin";
import { Link } from "react-router-dom";

const Header = ({ users, currentUser }) => {
  return (
    <div>
      <header className="Header">
        <h1>Nicole's NC-News</h1>
      </header>
      <nav>
        <Link to={`/users`}>
          <UserLogin currentUser={currentUser} users={users} />
        </Link>
        <Link to={`/users`}>
          <button hidden={currentUser}>Login</button>
        </Link>
      </nav>
    </div>
  );
};

export default Header;
