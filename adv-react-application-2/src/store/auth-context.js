import React from "react";


const AuthContext = React.createContext({
    isLoggedIn: false,
    //just to help IDE to help with options while typing  
    onLogout : () =>{}
});

export default AuthContext;