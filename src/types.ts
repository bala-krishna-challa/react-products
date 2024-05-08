import { SET_SELECTED_USER_ID, SET_USERS } from "./constants";

export type Picture = {
  large: string;
};

export interface User {
  name: string;
  emailId: string;
  picture: Picture;
  phone: string;
  cell: string;
  isActive: boolean;
  id: string;
}

export interface UserContextState {
  users: User[];
  selectedUserId: string;
  setSelectedUserId: (userId: string) => void;
}

export interface SetUsersAction {
  type: typeof SET_USERS;
  payload: { users: User[] };
}
export interface SetSelectedUserAction {
  type: typeof SET_SELECTED_USER_ID;
  payload: { selectedUserId: string };
}

export type UserContextAction = SetUsersAction | SetSelectedUserAction;
