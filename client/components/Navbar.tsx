"use client";
import { AuthCtx } from "@/context/Auth";
import Link from "next/link";
import React, { useContext } from "react";

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
                <Link
                  href={`/profile/${user.id}`}
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                >
                  Profile
                </Link>
                <button
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-white text-gray-900 py-2 px-3 rounded-lg font-medium"
                >
                  Sign up
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
