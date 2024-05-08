import React, { useContext, useReducer } from "react";
import { createContext } from "react";
import { SET_SELECTED_USER_ID, SET_USERS } from "../constants";

import {
  SetSelectedUserAction,
  SetUsersAction,
  UserContextAction,
  UserContextState,
} from "../types";

const contextDefaultValue: UserContextState = {
  users: [],
  selectedUserId: "",
  setSelectedUserId: () => {},
};

const reducer = (
  state: UserContextState,
  action: UserContextAction
): UserContextState => {
  const { type } = action;
  switch (type) {
    case SET_USERS:
      const {
        payload: { users },
      } = action as SetUsersAction;
      return { ...state, users };
    case SET_SELECTED_USER_ID:
      const {
        payload: { selectedUserId },
      } = action as SetSelectedUserAction;
      return { ...state, selectedUserId };
    default:
      throw new Error(`Action type ${type} not handled.`);
  }
};

const UserContext = createContext<
  [UserContextState, React.Dispatch<UserContextAction>]
>([contextDefaultValue, () => {}]);

const UserProvider = (props) => {
  let [state, dispatch] = useReducer(reducer, contextDefaultValue);

  const setSelectedUserId = (userId) => {
    dispatch({
      type: SET_SELECTED_USER_ID,
      payload: { selectedUserId: userId },
    });
  };

  state = { ...state, setSelectedUserId };

  return <UserContext.Provider value={[state, dispatch]} {...props} />;
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext should be used inside UserProvider");
  }

  return context;
};

export { UserProvider, useUserContext };
