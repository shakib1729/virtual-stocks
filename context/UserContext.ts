import { createContext, Dispatch, SetStateAction } from "react";
import { User } from "@/types";

type UserContextValue = {
  user?: User;
  setUser?: Dispatch<SetStateAction<User | undefined>>;
};

const UserContext = createContext<UserContextValue>({});

export default UserContext;
