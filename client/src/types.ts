export interface Post {
  identifier: string;
  title: string;
  slug: string;
  subName: string;
  createdAt: string;
  updatedAt: string;
  body?: string;
  url: string;
  username: string;
  voteScore?: number;
  commentCount?: number;
  userVote?: number;
}
