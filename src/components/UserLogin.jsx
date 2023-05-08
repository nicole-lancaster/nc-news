const UserLogin = ({ currentUser }) => {
  if (currentUser === undefined) {
    return;
  }
  return (
    <section>
      <img
        className="user-login-avatar mr-4"
        src={currentUser.avatar_url}
        alt={currentUser.username}
      />
    </section>
  );
};

export default UserLogin;
