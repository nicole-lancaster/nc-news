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
      <div className="flex flex-col justify-center items-center animate-pulse">
        <NewspaperIcon className="h-8 w-auto mr-2 animate-pulse" />
        <p className="font-mono">Loading users...</p>
      </div>
    );

  return (
    <section className="flex flex-col">
      <div className="flex-grow">
        <ul className="flex flex-row flex-wrap justify-center items-center">
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
      </div>
    </section>
  );
};

export default UsersList;
