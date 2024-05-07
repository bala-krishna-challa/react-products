import React, { useEffect, useState } from "react";

import Register from "../Register/Register";
import useHttp from "../hooks/useHttp";
import { User } from "../types";
import UserContext from "../contexts/UserContext";
import UserList from "./UserList";
import InfoContext from "../contexts/InfoContext";

interface UserListProps {
  users: User[];
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const { statusCode, data, initiateRequest } = useHttp<UserListProps>({
    uri: "users",
  });

  useEffect(() => {
    if (statusCode && statusCode.toString().startsWith("2") && data) {
      setUsers(data.users);
    }
  }, [statusCode, data]);

  return (
    <InfoContext.Provider value={{ info: "Some other value" }}>
      <Register onUserCreation={() => initiateRequest()} />
      <UserContext.Provider
        value={{ users, selectedUserId, setSelectedUserId }}
      >
        <div className="main-content">
          <h3 className="header">Platform Users</h3>
          <UserList />
        </div>
      </UserContext.Provider>
    </InfoContext.Provider>
  );
};
export default Users;
