import Link from "next/link";
import React from "react";
import { Post } from "../types";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div
      key={post.identifier}
      className="flex flex-col items-center w-6/12 bg-white shadow-2xl h-52 rounded-tl-4xl rounded-tr-4xl rounded-bl-3.5xl rounded-br-3.5xl mb-12"
    >
      <div className="flex items-center justify-between w-full px-10 bg-secondary h-2/7 rounded-tl-4xl rounded-tr-4xl">
        <div className="flex items-center justify-center">
          <p className="text-base text-secondary">
            Posted by{" "}
            <Link href={`/u/${post.username}`}>
              <span className="font-medium cursor-pointer text-green hover:underline">
                /u/{post.username}
              </span>
            </Link>
          </p>
          <i className="mx-3 text-gray-300 text-xs2 fas fa-circle"></i>
          <Link href={post.url}>
            <p className="text-xs text-gray-400 cursor-pointer hover:underline">
              {dayjs(post.createdAt).fromNow()}
            </p>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center mx-3">
            <i className="mr-2 text-2xl fas fa-heartbeat text-green"></i>
            <p className="text-sm font-semibold">{post.voteScore}</p>
          </div>
          <div className="flex items-center justify-center mx-3">
            <i className="mr-2 text-2xl fas fa-comment-dots text-green"></i>
            <p className="text-sm font-semibold">{post.commentCount}</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between w-full px-10 py-2 h-4/7">
        <div className="flex flex-col w-full">
          <p className="mb-1 text-xl font-bold truncate text-secondary">
            {post.title}
          </p>
          <p className="text-sm truncate text-secondary">{post.body}</p>
        </div>
        <div className="flex items-center">
          <div className="flex items-center justify-center px-2 mr-5 text-gray-300 transition rounded cursor-pointer hover:bg-gray-200 hover:text-green">
            <i className="mr-2 text-2xl cursor-pointer fas fa-heartbeat"></i>
            <p className="text-sm font-semibold">Love</p>
          </div>
          <Link href={post.url}>
            <div className="flex items-center justify-center px-2 text-gray-300 transition rounded cursor-pointer hover:bg-gray-200 hover:text-green">
              <i className="mr-2 text-2xl cursor-pointer fas fa-comment-dots"></i>
              <p className="text-sm font-semibold cursor-pointer">Comment</p>
            </div>
          </Link>
        </div>
      </div>
      <div className="flex items-center justify-center w-full px-10 text-sm rounded-bl-full rounded-br-full bg-green h-1/7">
        <Link href={`/r/${post.subName}`}>
          <img
            className="w-6 h-auto mr-2 cursor-pointer"
            src="/images/companylogo.png"
            alt="company logo"
          />
        </Link>
        <Link href={`/r/${post.subName}`}>
          <a className="text-white">/fa/{post.subName}</a>
        </Link>
      </div>
    </div>
  );
}
