"use client";
import { UserType } from "@/app/types/types";
import apiClient from "@/lib/apiClient";
import React, {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

type GetUser = Pick<UserType, "id" | "username" | "email"> | null;

type AuthCtxType = {
  user: GetUser;
  login: (token: string) => void;
  logout: () => void;
};

type authProviderType = {
  children: ReactNode;
};

const defaultAuthCtx: AuthCtxType = {
  user: null,
  login: () => {},
  logout: () => {},
};

const fetchUser = (setUser: Dispatch<SetStateAction<GetUser>>) => {
  apiClient
    .get("user/find")
    .then((res) => {
      setUser(res.data.user);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const AuthCtx = createContext(defaultAuthCtx);

export const AuthProvider: FC<authProviderType> = ({ children }) => {
  const [user, setUser] = useState<GetUser | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
      fetchUser(setUser);
    }
  }, []);

  const login = (token: string) => {
    localStorage.setItem("auth_token", token);
    apiClient.defaults.headers["Authorization"] = `Bearer ${token}`;
    fetchUser(setUser);
  };
  const logout = () => {
    localStorage.removeItem("auth_token");
    delete apiClient.defaults.headers["Authorization"];
    setUser(null);
  };

  const value: AuthCtxType = {
    user,
    login,
    logout,
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
