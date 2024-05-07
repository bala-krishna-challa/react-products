import { createContext } from "react";
import { User } from "../types";

interface UserContextValue {
  users: User[];
  selectedUserId: string;
  setSelectedUserId: React.Dispatch<React.SetStateAction<string>>;
}

const UserContext = createContext<UserContextValue>({
  users: [],
  selectedUserId: "",
  setSelectedUserId: () => {},
});

export default UserContext;
