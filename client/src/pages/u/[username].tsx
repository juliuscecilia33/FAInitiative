// #20

import dayjs from "dayjs";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import PostCard from "../../components/PostCard";
import Sidebar from "../../components/Sidebar";
import { Comment, Post } from "../../types";

export default function user() {
  const router = useRouter();
  const username = router.query.username;

  const { data, error } = useSWR<any>(username ? `/users/${username}` : null);

  if (error) router.push("/");

  if (data) console.log(data);

  return (
    <>
      <Head>
        <title>{data?.user.username}</title>
      </Head>
      {data && (
        <div className="flex w-full">
          <Sidebar />
          <div className="flex flex-col items-center bg-transparent w-17/18 ml-1/18">
            <div className="flex items-center justify-center w-full py-16 bg-transparent bg-green">
              <div className="flex items-center justify-center mr-16">
                <div className="w-20 h-20 mr-3 overflow-hidden bg-gray-500 rounded-full shadow-md">
                  <Image
                    src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                    alt="Profile"
                    width={100}
                    height={100}
                  />
                </div>
                <p className="text-2xl text-secLightGray">
                  {data.user.username}
                </p>
              </div>
              <div className="flex items-center justify-center px-10 py-4 text-base bg-white rounded-4xl text-secondary">
                Joined {dayjs(data.user.createdAt).format("MMM YYYY")}
              </div>
            </div>
            <div className="flex flex-col items-center w-14/18 mt-14">
              {data.submissions.map((submission: any) => {
                if (submission.type === "Post") {
                  const post: Post = submission;
                  return <PostCard key={post.identifier} post={post} />;
                } else {
                  const comment: Comment = submission;
                  return (
                    <div
                      key={comment.identifier}
                      className="flex flex-col items-center w-9/12 pb-6 my-8 bg-white shadow-2xl rounded-4xl"
                    >
                      <div className="flex items-center w-full px-12 py-3 rounded-tl-4xl rounded-tr-4xl bg-gradient-to-r from-primary to-secondary">
                        <i className="mr-5 text-2xl cursor-pointer fas fa-comment-dots text-secLightGray"></i>
                        <p className="text-base text-secLightGray">
                          {comment.username}
                        </p>
                        <p className="ml-1 text-base text-secLightGray">
                          commented on
                        </p>
                        <Link href={comment.post.url}>
                          <a className="ml-1 text-base font-bold truncate cursor-pointer text-secLightGray hover:underline">
                            {comment.post.title}
                          </a>
                        </Link>
                        <Link href={`/fa/${comment.post.subName}`}>
                          <a className="ml-1 text-sm truncate cursor-pointer text-secLightGray hover:underline">
                            - /fa/{comment.post.subName}
                          </a>
                        </Link>
                      </div>
                      <p className="mt-5 text-base text-secondary">
                        {comment.body}
                      </p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
