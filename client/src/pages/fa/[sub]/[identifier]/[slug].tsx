// 18 21:40

import Head from "next/head";
import Link from "next/link";
import Sidebar from "../../../../components/Sidebar";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { Post, Comment } from "../../../../types";
import AssembliesAndSub from "../../../../components/AssembliesAndSub";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import classNames from "classnames";
import Axios from "axios";
import { useAuthState } from "../../../../context/auth";
import { FormEvent, useState } from "react";

dayjs.extend(relativeTime);

export default function PostPage() {
  // Local State
  const [newComment, setNewComment] = useState("");

  // Global State
  const { authenticated, user } = useAuthState();

  // Utils
  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  const { data: post, error } = useSWR<Post>(
    identifier && slug ? `/posts/${identifier}/${slug}` : null
  );

  const { data: comments, revalidate } = useSWR<Comment[]>(
    identifier && slug ? `/posts/${identifier}/${slug}/comments` : null
  );

  if (error) router.push("/");

  const vote = async (value: number, comment?: Comment) => {
    // If not logged in go to login
    if (!authenticated) router.push("/login");

    // If vote is the same reset vote
    if (
      (!comment && value === post.userVote) ||
      (comment && comment.userVote === value)
    ) {
      value = 0;
    }

    try {
      await Axios.post("/misc/vote", {
        identifier,
        slug,
        commentIdentifier: comment?.identifier,
        value,
      });

      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  const submitComment = async (event: FormEvent) => {
    event.preventDefault();
    if (newComment.trim() === "") return;

    try {
      await Axios.post(`/posts/${post.identifier}/${post.slug}/comments`, {
        body: newComment,
      });

      setNewComment("");

      revalidate();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <div className="flex w-full">
        <Sidebar />

        <div className="flex justify-end w-full mt-14 pr-14 pl-2/18">
          <div className="flex flex-col w-6/12 mx-auto bg-white shadow-2xl p-14 rounded-4xl mb-14">
            {post && (
              <div className="flex justify-between w-full">
                <div className="flex-col w-10/12">
                  <div className="flex items-center mb-4">
                    <p className="text-sm text-secondary">
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
                  <p className="w-11/12 mb-4 text-xl font-bold text-secondary">
                    {post.title}
                  </p>
                  <p className="w-10/12 text-base text-gray-400">{post.body}</p>
                </div>
                <div className="flex flex-col items-center justify-between h-24 px-3 py-3 rounded-4xl bg-secondary">
                  <i
                    onClick={() => vote(1)}
                    className={classNames(
                      "text-2xl cursor-pointer fas fa-heartbeat text-gray-300 transition hover:text-green",
                      { "text-green": post.userVote === 1 }
                    )}
                  ></i>
                  <p className="font-bold text-secondary">{post.voteScore}</p>
                </div>
              </div>
            )}
            {authenticated && (
              <div className="flex-col w-full mt-24 mb-2">
                <div className="flex items-center justify-between w-full px-2">
                  <p className="text-sm">
                    Comment as{" "}
                    <span className="font-semibold text-green">
                      {user.username}
                    </span>
                  </p>
                  <p className="text-sm">{post?.commentCount} Comments</p>
                </div>
              </div>
            )}
            {authenticated ? (
              <div className="flex w-full h-48 px-5 mb-6 border rounded-2xl bg-secondary font-body focus:bg-white hover:bg-white">
                <textarea
                  placeholder="What do you think?"
                  className="w-full py-4 transition duration-200 bg-transparent outline-none"
                  style={{ resize: "none" }}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full h-48 mt-6 border rounded-2xl">
                <p className="mb-4 text-center text-minimal">
                  Need to be logged in to comment
                </p>
                <div className="flex items-center">
                  <Link href="/login">
                    <button className="w-32 py-2 mr-4 font-semibold transition rounded-full focus:outline-none text-green hover:bg-gray-200 hover:text-green">
                      Log in
                    </button>
                  </Link>
                  <Link href="/register">
                    <button className="w-32 py-2 font-semibold text-white rounded-full outline-none focus:outline-none bg-gradient-to-r from-primary to-secondary">
                      Sign up
                    </button>
                  </Link>
                </div>
              </div>
            )}
            {authenticated && (
              <button
                onClick={submitComment}
                disabled={newComment.trim() === ""}
                className="flex items-center justify-center py-2 ml-auto text-sm font-semibold text-white rounded-full outline-none button px-7 focus:outline-none bg-gradient-to-r from-primary to-secondary"
              >
                <i className="h-auto mr-2 text-base text-white fas fa-comment"></i>
                Comment
              </button>
            )}
            <div className="flex flex-col items-center w-full px-3 py-6 mt-14">
              {comments?.map((comment) => (
                <div
                  className="flex items-center w-full my-6"
                  key={comment.identifier}
                >
                  <div className="flex flex-col items-center px-3 py-3 mr-5 rounded-4xl bg-secondary">
                    <i
                      onClick={() => vote(1, comment)}
                      className={classNames(
                        "mb-2 text-xl cursor-pointer fas fa-heartbeat text-gray-300 transition hover:text-green",
                        { "text-green": comment.userVote === 1 }
                      )}
                    ></i>
                    <p className="font-bold text-secondary">
                      {comment.voteScore}
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <Link href={`/u/${comment.username}`}>
                      <a className="flex items-center mb-2 font-bold hover:underline text-secondary">
                        {comment.username}{" "}
                        <i className="mx-3 text-gray-300 text-xs2 fas fa-circle"></i>
                        <p className="text-xs text-gray-400 cursor-pointer hover:underline">
                          {dayjs(comment.createdAt).fromNow()}
                        </p>
                      </a>
                    </Link>
                    <p>{comment.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {post && <AssembliesAndSub sub={post.sub} />}
        </div>

        <Link href={`/fa/${sub}`}>
          <div className="fixed bottom-0 z-10 flex items-center justify-center cursor-pointer left-1/18 w-17/18 h-4v bg-gradient-to-r from-primary to-secondary">
            {post && (
              <div className="mr-2 overflow-hidden rounded-full w-7 h-7">
                <Image src={post.sub.imageUrl} height={100} width={100} />
              </div>
            )}
            <p className="text-base text-white hover:underline">{`/fa/${sub}`}</p>
          </div>
        </Link>
      </div>
    </>
  );
}
