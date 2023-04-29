const UserLogin = ({ currentUser }) => {
  if (currentUser === undefined) {
    return <p>Please login</p>;
  }
  return (
    <section>
      <img
        className="user-login-avatar"
        src={currentUser.avatar_url}
        alt={currentUser.username}
      />
    </section>
  );
};

export default UserLogin;
