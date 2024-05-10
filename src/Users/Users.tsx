import React, { useEffect } from "react";

import Register from "../Register/Register";
import useHttp from "../custom-hooks/useHttp";
import { User } from "../types";
import UserList from "./UserList";
import InfoContext from "../contexts/InfoContext";
import { SET_USERS } from "../constants";
import { useUserContext } from "../contexts/UserProvider";

interface UserListProps {
  users: User[];
}

const Users = () => {
  const [_, dispatch] = useUserContext();

  const { statusCode, data, initiateRequest } = useHttp<UserListProps>({
    uri: "users",
  });

  useEffect(() => {
    if (statusCode && statusCode.toString().startsWith("2") && data) {
      dispatch({ type: SET_USERS, payload: { users: data.users } });
    }
  }, [statusCode, data]);

  return (
    <InfoContext.Provider value={{ info: "Some other value" }}>
      <Register onUserCreation={() => initiateRequest()} />
      <div className="main-content">
        <h3 className="header">Platform Users</h3>
        <UserList />
      </div>
    </InfoContext.Provider>
  );
};
export default Users;
