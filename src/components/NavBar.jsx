import { Link } from "react-router-dom";
import UserLogin from "./UserLogin.jsx";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const NavBar = ({ currentUser, users, setCurrentUser }) => {
  const handleLoginClick = () => {
    if (currentUser) {
      setCurrentUser(undefined);
    }
  };

  const loginBtn = (
    <button className="login-logout-btn" onClick={handleLoginClick}>
      {currentUser ? `Logout` : `Login`}
    </button>
  );
  return (
    <Navbar bg="light" expand="lg" className="nav-bar">
      <Navbar.Brand to="/" className="nav-bar-brand">
        Nicole's NC-News
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Item>
            <Link className="nav-links" to="/">
              Home
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link className="nav-links" to="/users">
              Users
            </Link>
          </Nav.Item>
          <Nav.Item>
            {" "}
            <UserLogin currentUser={currentUser} users={users} />{" "}
            {!currentUser ? (
              <Link to={`/users`}>{loginBtn}</Link>
            ) : (
              <>{loginBtn}</>
            )}
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
