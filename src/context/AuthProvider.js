import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = props => {
  const [auth, setAuth] = useState({});

  console.log(auth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
