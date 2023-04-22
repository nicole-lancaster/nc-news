import UserLogin from "./UserLogin";

const Header = ({ users, currentUser }) => {
  return (
    <div>
      <header className="Header">
        <h1>NC-News</h1>
      </header>
      <nav>
        <UserLogin currentUser={currentUser} users={users} />
      </nav>
    </div>
  );
};

export default Header;
