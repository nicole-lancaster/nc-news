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
    <main>
      <ul className="user-list-flex-container">
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
    </main>
  );
};

export default UsersList;
