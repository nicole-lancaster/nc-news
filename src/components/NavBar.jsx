import { Link } from "react-router-dom";
import UserLogin from "./UserLogin.jsx";
import { useState } from "react";

const NavBar = ({ currentUser, users }) => {
  const [disabled, setDisabled] = useState(false);

  const handleLoginClick = () => {
    setDisabled(true);
  };

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
          <Link to={`/users`}>
            <button onClick={handleLoginClick} disabled={disabled}>
              Login
            </button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
