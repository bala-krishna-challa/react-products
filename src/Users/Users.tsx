import React, { useEffect, useReducer, useState } from "react";

import Register from "../Register/Register";
import useHttp from "../hooks/useHttp";
import { User } from "../types";
import UserContext from "../contexts/UserContext";
import UserList from "./UserList";
import InfoContext from "../contexts/InfoContext";
import userReducer, { contextDefaultValue } from "../reducers/userReducer";
import { SET_SELECTED_USER_ID, SET_USERS } from "../constants";

interface UserListProps {
  users: User[];
}

const Users = () => {
  // const [users, setUsers] = useState<User[]>([]);
  // const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [state, dispatch] = useReducer(userReducer, contextDefaultValue);
  const { users, selectedUserId } = state;
  const { statusCode, data, initiateRequest } = useHttp<UserListProps>({
    uri: "users",
  });

  useEffect(() => {
    console.log("statusCode", statusCode);
    console.log("data", data);
    if (statusCode && statusCode.toString().startsWith("2") && data) {
      dispatch({ type: SET_USERS, payload: { users: data.users } });
      // setUsers(data.users);
    }
  }, [statusCode, data]);

  const setSelectedUserId = (userId) => {
    dispatch({
      type: SET_SELECTED_USER_ID,
      payload: { selectedUserId: userId },
    });
  };

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
