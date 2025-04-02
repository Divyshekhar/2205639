export interface User {
  id: string;
  name: string;
  avatar: string;
  postCount: number;
}

export interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  image: string;
  commentCount: number;
  createdAt: string;
}