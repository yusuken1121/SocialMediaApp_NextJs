"use client";
import React, { FC, ReactNode, createContext } from "react";

type AuthCtxType = {
  login: (token: string) => void;
  logout: () => void;
};

type authProviderType = {
  children: ReactNode;
};

const defaultAuthCtx: AuthCtxType = {
  login: () => {},
  logout: () => {},
};

export const AuthCtx = createContext(defaultAuthCtx);

export const AuthProvider: FC<authProviderType> = ({ children }) => {
  const login = async (token: string) => {
    await localStorage.setItem("auth_token", token);
  };
  const logout = () => {
    localStorage.removeItem("auth_token");
  };

  const value: AuthCtxType = {
    login,
    logout,
  };
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
};
