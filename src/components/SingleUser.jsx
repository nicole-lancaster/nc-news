import { useState } from "react";
import LoggedInModal from "./LoggedInModal";

const SingleUser = ({ user, currentUser, setCurrentUser }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginClick = (user) => {
    setIsLoading(true);
    setCurrentUser(user);
    setIsLoading(false);
  };

  if (isLoading) return <p>Logging in...</p>;

  return (
    <section>
      <div className="border-2 border-light-gray-700 shadow rounded-lg hover:border-pink-700 m-1 p-1 w-32 md:w-48 lg:w-60 xl:w-100 2xl:w-110">
        <button
          className=""
          onClick={() => handleLoginClick(user)}
          disabled={user.username === currentUser?.username}
        >
          <li className="content-around mx-1 my-2 ">
            {user.name}
            <p className="text-center text-xs md:text-sm lg:text-base xl:text-lg font-mono mt-2">
              {user.username}
            </p>
            <img
              className="p-1 w-20 h-20"
              src={user.avatar_url}
              alt={user.username}
            />
          </li>
        </button>
      </div>
      {currentUser === user ? <LoggedInModal user={user} /> : null}
    </section>
  );
};
export default SingleUser;
