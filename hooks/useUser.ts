// Libs
import { useContext } from "react";

// Contexts
import UserContext from "@/context/UserContext";

export const useUser = () => useContext(UserContext);
