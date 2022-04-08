import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export const useUser = () => {
    const context = useContext(UserContext);
    
    return context;
}