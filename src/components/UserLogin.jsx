const UserLogin = ({ currentUser }) => {
  if (currentUser === undefined) {
    return <p>Please login as a user</p>;
  }
  return (
    <section className="user-login-flex-container">
      <p className="user-login-message">Logged in as {currentUser.username}!</p>
      <img
        className="user-login-avatar"
        src={currentUser.avatar_url}
        alt={currentUser.username}
      />
    </section>
  );
};

export default UserLogin;
