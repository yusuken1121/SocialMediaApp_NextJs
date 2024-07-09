import Image from "next/image";
import React from "react";

const UserProfile = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <Image
              src=""
              className="w-20 h-20 rounded-full mr-4"
              alt="User Avatar"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-1">User Name</h2>
              <p className="text-gray-600">Nice to meet you</p>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <Image
                src=""
                className="w-10 h-10 rounded-full mr-2"
                alt="User Avatar"
              />
              <div>
                <h2 className="font-semibold text-md">User Name</h2>
                <p className="text-gray-500 text-sm">May 8, 2023</p>
              </div>
            </div>
            <p className="text-gray-700">This is my first post.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
