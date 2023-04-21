import UserLogin from "./UserLogin";

const Header = ({ isLoggedIn, setIsLoggedIn, users, setUsers }) => {
  return (
    <div>
      <header className="Header">
        <h1>NC-News</h1>
      </header>
      <nav>
        <UserLogin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      </nav>
    </div>
  );
};

export default Header;
