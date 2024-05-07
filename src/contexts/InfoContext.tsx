import { createContext } from "react";
import { User } from "../types";

interface InfoContextValue {
  info: string;
}

const InfoContext = createContext<InfoContextValue>({
  info: "Some data",
});

export default InfoContext;
