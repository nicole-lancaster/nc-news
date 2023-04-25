import { Link } from "react-router-dom";
import UserLogin from "./UserLogin.jsx";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

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
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand to="/">
          <UserLogin currentUser={currentUser} users={users} />{" "}
          {!currentUser ? (
            <Link to={`/users`}>{loginBtn}</Link>
          ) : (
            <>{loginBtn}</>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav-bar-flex-container">
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
            <Nav.Item></Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
