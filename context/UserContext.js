import { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext([{}, () => {}]);

const UserProvider = (props) => {
  const [state, setState] = useState({});
  let userFromStorage = null;

  return (
    <UserContext.Provider value={[state, setState]}>
      <UserFromStorage>{props.children}</UserFromStorage>
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };

const UserFromStorage = ({ children }) => {
  const [userContext, setUserContext] = useContext(UserContext);
  let storageUser;

  useEffect(() => {
    if (window.location != "undefined") {
      storageUser = JSON.parse(localStorage.getItem("user"));
      if (storageUser) {
        setUserContext({ user: storageUser.email });
      }
    }
  }, []);
  return children;
};
