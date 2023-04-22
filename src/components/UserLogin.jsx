import { Link } from "react-router-dom";
import { useState } from "react";

const UserLogin = ({ currentUser }) => {
  const [disabled, setDisabled] = useState(false);

  return (
    <section>
      {currentUser === undefined ? <p>Please login as a user</p> : null}
      <Link to={`/users`}>
        <button disabled={disabled}>Login here</button>
      </Link>
    </section>
  );
};

export default UserLogin;
