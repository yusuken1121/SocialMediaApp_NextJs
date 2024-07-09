export type ProfileType = {
  id: number;
  bio: string;
  profileImgUrl: string;
  profile: UserType;
  profileId: number;
};

export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostType[];
  profile: ProfileType;
};

export type PostType = {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserType;
};
