export type UserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  posts: PostType[];
};

export type PostType = {
  id: number;
  content: string;
  createdAt: string;
  authorId: number;
  author: UserType;
};
