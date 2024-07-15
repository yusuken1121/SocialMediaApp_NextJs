"use client";
import React, { FormEvent, useEffect, useState } from "react";
import Post from "./Post";
import apiClient from "@/lib/apiClient";
import { PostType } from "@/app/types/types";
import { SkeletonCard } from "./template/skeltonCard";

const Timeline = () => {
  const [postText, setPostText] = useState<string>("");
  const [latestPost, setLatestPost] = useState<PostType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //Implement initial login and reload functionality
  useEffect(() => {
    const fetchLatestPosts = async () => {
      try {
        const response = await apiClient.get("/posts/latest-posts");
        setLatestPost(response.data.latestPosts);
      } catch (error) {
        alert("A server error is occured");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestPosts();
  }, []);

  //Implement functionality for posting a new comment
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newPost = await apiClient.post("/posts/post", {
        content: postText,
      });
      setLatestPost((prev) => [newPost.data, ...prev]);
      setPostText("");
    } catch (error) {
      alert("please login");
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
        {loading
          ? [...Array(6)].map((_, i) => <SkeletonCard key={i} />)
          : latestPost.map((post: PostType) => {
              return <Post key={post.id} post={post} />;
            })}
      </main>
    </div>
  );
};

export default Timeline;
