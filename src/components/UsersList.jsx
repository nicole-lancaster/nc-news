import SingleUser from "./SingleUser.jsx";
import { useEffect, useState } from "react";
import { fetchUsers } from "../api.js";

const UsersList = ({ users, setUsers, currentUser, setCurrentUser }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchUsers(setUsers).then((usersList) => {
      setUsers(usersList);
      setIsLoading(false);
    });
  }, [setUsers]);

  if (isLoading)
    return (
      <div>
        <p>Loading all users...</p>
      </div>
    );

  return (
    <section>
      <ul className="flex flex-row flex-wrap justify-evenly">
        {users.map((user) => {
          return (
            <SingleUser
              key={user.username}
              user={user}
              currentUser={currentUser}
              setCurrentUser={setCurrentUser}
            />
          );
        })}
      </ul>
    </section>
  );
};

export default UsersList;
