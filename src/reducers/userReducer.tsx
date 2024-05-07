import { SET_SELECTED_USER_ID, SET_USERS } from "../constants";
import {
  SetSelectedUserAction,
  SetUsersAction,
  UserContextAction,
  UserContextState,
} from "../types";

export const contextDefaultValue: UserContextState = {
  users: [],
  selectedUserId: "",
};

const userReducer = (
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

export default userReducer;
