import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import firebase from "../firebaseConfig";

export interface AuthContextModel {
  user: firebase.User | null; // null when not logged in
}

const initialValue: AuthContextModel = {
  user: null,
};

export const AuthContext = createContext(initialValue);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<firebase.User | null>(null);

  // Remember useEffect makes sure this code only runs once.
  useEffect(() => {
    // The return here passes the unsubscribe function back to useEffect which
    // will call it when this component is unmounted.
    return firebase.auth().onAuthStateChanged((newUser) => {
      setUser(newUser);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

export function useAuthUser(): firebase.User | null {
  return useContext(AuthContext).user;
}
