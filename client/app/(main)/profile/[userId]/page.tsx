"use client";
import { PostType, ProfileType } from "@/app/types/types";
import Post from "@/components/template/organisms/Post";

import apiClient from "@/lib/apiClient";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const UserProfile = ({ params }: { params: { userId: string } }) => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [posts, setPosts] = useState<PostType[] | null>(null);
  const { userId } = params;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await apiClient.get(`/user/profile/${userId}`);
        const { profile } = profileData.data;
        setProfile(profile);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    const fetchUserPosts = async () => {
      try {
        const userPostsData = await apiClient.get(`posts/${userId}/user-posts`);
        const { userPosts } = userPostsData.data;
        console.log(userPosts);
        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching user posts data:", error);
      }
    };
    fetchProfile();
    fetchUserPosts();
  }, [userId]);

  console.log(`posts:${JSON.stringify(posts)}`);
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full max-w-xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <div className="flex items-center">
            <Image
              src={profile?.profileImgUrl || "/profile.png"}
              width={40}
              height={40}
              className="w-20 h-20 rounded-full mr-4"
              alt="User Avatar"
            />
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                {profile?.profile.username || "default"}
              </h2>
              <p className="text-gray-600">{profile?.bio || "default"}</p>
            </div>
          </div>
        </div>
        {posts?.map((post) => {
          console.log(post);
          return <Post key={post.id} post={post} />;
        })}
      </div>
    </div>
  );
};

export default UserProfile;
