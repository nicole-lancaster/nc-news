import SingleUser from "./SingleUser.jsx";
import { useEffect, useState } from "react";
import { fetchUsers } from "../api.js";
import { NewspaperIcon } from "@heroicons/react/24/outline";

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
      <div className="flex flex-col h-screen justify-center items-center animate-pulse">
      <NewspaperIcon className="h-8 w-auto mr-2 animate-pulse" />
      <p className="font-mono">Loading users...</p>
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
