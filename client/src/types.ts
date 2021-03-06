export interface Post {
  identifier: string;
  title: string;
  slug: string;
  subName: string;
  createdAt: string;
  updatedAt: string;
  sub?: Sub;
  body?: string;
  url: string;
  username: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}

export interface User {
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Sub {
  createdAt: string;
  updatedAt: string;
  name: string;
  title: string;
  description: string;
  ImageUrn: string;
  bannerUrn: string;
  username: string;
  posts: Post[];
  // Virtuals
  imageUrl: string;
  bannerUrl: string;
  postCount?: number;
}

export interface Comment {
  createdAt: string;
  updatedAt: string;
  identifier: string;
  body: string;
  username: string;
  post?: Post;
  // Virtuals
  userVote: number;
  voteScore: number;
}
