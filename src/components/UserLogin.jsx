import { Link } from "react-router-dom";

const UserLogin = ({
  user,
  signedInUser,
  ChooseUser,
  isLoggedIn,
  setIsLoggedIn,
}) => {
  return (
    <Link to={`/users`}>
      <p>Login here</p>
    </Link>
  );
};

export default UserLogin;
