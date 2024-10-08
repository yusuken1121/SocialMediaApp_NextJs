import { PostType } from "@/app/types/types";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

type postPropsType = {
  post: PostType;
};

const Post: FC<postPropsType> = ({ post }) => {
  const { author, createdAt, content } = post;
  return (
    <div className="bg-white shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Link href={`/profile/${author.id}`}>
            <Image
              className="w-10 h-10 rounded-full mr-2"
              src={post.author.profile?.profileImgUrl}
              alt="User Avatar"
              width={10}
              height={10}
              unoptimized={true}
            />
          </Link>
          <div>
            <h2 className="font-semibold text-md">{author.username}</h2>
            <p className="text-gray-500 text-sm">
              {new Date(createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{content}</p>
      </div>
    </div>
  );
};

export default Post;
