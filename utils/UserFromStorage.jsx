import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

const UserFromStorage = ({ children }) => {
  const [userContext, setUserContext] = useContext(UserContext);
  let storageUser;

  useEffect(() => {
    if (window.location != "undefined") {
      storageUser = JSON.parse(localStorage.getItem("user"));
      if (storageUser) {
        setUserContext(storageUser)
      }
    }
  }, []);
  return <>{children}</>;
};
