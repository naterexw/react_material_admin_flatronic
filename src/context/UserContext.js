import React from "react";
import jwt from "jsonwebtoken";

//config
import config from "../../src/config";

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("token")
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(
  dispatch,
  login,
  password,
  history,
  setIsLoading,
  setError,
  social = ""
) {
  setError(false);
  setIsLoading(true);

  // We check if app runs with backend mode
  if (!config.isBackend) {
    setTimeout(() => {
      setError(null);
      setIsLoading(false);
      receiveToken("token", dispatch);
    }, 2000);
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  document.cookie = "token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}

export function receiveToken(token, dispatch) {
  let user;

  // We check if app runs with backend mode
  if (config.isBackend) {
    user = jwt.decode(token).user;
    delete user.id;
  } else {
    user = {
      email: config.auth.email
    };
  }

  delete user.id;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("theme", "default");
  dispatch({ type: "LOGIN_SUCCESS" });
}
