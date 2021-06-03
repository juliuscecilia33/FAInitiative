// #19 35:02

import Head from "next/head";
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
            <div className="flex items-center justify-center w-full bg-transparent bg-green h-20v">
              <div className="flex items-center justify-center mr-16">
                <div className="w-20 h-20 mr-3 bg-gray-500 rounded-full"></div>
                <p className="text-2xl text-secLightGray">julius</p>
              </div>
              <div className="flex items-center justify-center px-10 py-4 text-base bg-white rounded-4xl text-secondary">
                Joined 6 Days ago
              </div>
            </div>
            <div className="flex flex-col items-center w-full mt-14">
              {data.submissions.map((submission: any) => {
                if (submission.type === "Post") {
                  const post: Post = submission;
                  return <PostCard key={post.identifier} post={post} />;
                } else {
                  const comment: Comment = submission;
                  return (
                    <div
                      key={comment.identifier}
                      className="flex flex-col items-center w-9/12 py-4 my-4 bg-white rounded shadow-2xl"
                    >
                      <p>
                        <Link href={`/u/${comment.username}`}>
                          <a>{comment.username}</a>
                        </Link>
                      </p>
                      <p> commented on</p>
                      <p>
                        <Link href={comment.post.url}>
                          <a>{comment.post.title}</a>
                        </Link>
                      </p>
                      <Link href={`/fa/${comment.post.subName}`}>
                        <a>/fa/{comment.post.subName}</a>
                      </Link>
                      <p>{comment.body}</p>
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
