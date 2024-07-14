import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ userId: null });
  const [userFormDetail,setUserFormDetail] = useState({});

  useEffect(() => {
    
    const checkAuth = async()=>{
        const response = await fetch(`http://localhost:5001/api/auth/me`, {
          credentials: "include",
        });
        const responseData = await response.json();
        if (responseData.success) {
          setAuth({userId:responseData.data.id});
          return ()=>{};
        }
      }
    checkAuth();
  },[]);

  return (
    <AuthContext.Provider value={{auth,setAuth,userFormDetail,setUserFormDetail}}>
        {children}
    </AuthContext.Provider>
  )
};

const useAuth = ()=> useContext(AuthContext);

export {useAuth, AuthProvider};
