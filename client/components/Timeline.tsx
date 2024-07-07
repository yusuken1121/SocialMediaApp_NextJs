"use client";
import React, { FormEvent, useState } from "react";
import Post from "./Post";
import apiClient from "@/lib/apiClient";

const Timeline = () => {
  const [postText, setPostText] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await apiClient.post("/posts/post", {
        content: postText,
      });
      setPostText("");
    } catch (error) {
      alert("try again");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto py-4">
        <div className="bg-white shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPostText(e.target.value)
              }
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-gray-700 hover:bg-green-700 duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              Post
            </button>
          </form>
        </div>
        <Post />
      </main>
    </div>
  );
};

export default Timeline;
