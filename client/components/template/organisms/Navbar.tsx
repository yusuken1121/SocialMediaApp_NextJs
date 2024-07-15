"use client";
import { AuthCtx } from "@/context/Auth";
import Link from "next/link";
import React, { useContext } from "react";
import NavButton from "../atoms/NavButton";

const Navbar = () => {
  const { user, logout } = useContext(AuthCtx);
  return (
    <header className="bg-gray-700 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/">Social Media Clone</Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {user ? (
              <>
                <NavButton href={`/profile/${user.id}`}>Profile</NavButton>
                <NavButton onClick={logout}>Logout</NavButton>
              </>
            ) : (
              <>
                <NavButton href={"/login"}>Login</NavButton>
                <NavButton href={"/signup"}>Sign up</NavButton>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
