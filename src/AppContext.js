import React, { useEffect, useState } from "react";

const AppContext = React.createContext({
  profile: null,
  isLoading: false,
  isLoggedIn: false,
  login: (profile) => {},
  logout: () => {},
  
});

export const AppContextProvider = (props) => {
  const [profile, setProfile] = useState(() => {
    const profileString = localStorage.getItem("user_profile");
    return profileString ? JSON.parse(profileString) : null;
  });
 
 
  const loginHandler = (userProfile) => {
    setProfile(userProfile);
    localStorage.setItem("user_profile", JSON.stringify(userProfile));
  };

  const logoutHandler = () => {
    setProfile(null);
    localStorage.removeItem("user_profile");
  };

  const authCtx = {
    profile: profile,
    isLoggedIn: !!profile?.token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AppContext.Provider value={authCtx}>{props.children}</AppContext.Provider>
  );
};

export default AppContext;
