// 9:44 #15

import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import useSWR from "swr";
import PostCard from "../../components/PostCard";
import Sidebar from "../../components/Sidebar";
import { Sub } from "../../types";

export default function SubPage() {
  const router = useRouter();

  const subName = router.query.sub;

  const { data: sub, error } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

  if (error) router.push("/");

  let postsMarkup;

  if (!sub) {
    postsMarkup = <p className="text-lg text-center">Loading...</p>;
  } else if (sub.posts.length === 0) {
    postsMarkup = (
      <p className="text-lg text-center">No posts submitted yet!</p>
    );
  } else {
    postsMarkup = sub.posts.map((post) => (
      <PostCard key={post.identifier} post={post} />
    ));
  }

  return (
    <div className="w-full h-92v">
      <Head>
        <title>{sub?.title}</title>
      </Head>

      <div className="flex w-full h-full">
        <Sidebar />

        {sub && (
          <Fragment>
            {/* Sub info and images */}
            {/* Posts and Sidebar */}
            <div className="flex flex-col items-center w-full pt-8 bg-transparent pl-1/18">
              <div className="flex items-center justify-around w-full px-20 mb-20">
                <div className="h-56 shadow-2xl w-4/7 rounded-2xl bg-gradient-to-r from-primary to-secondary"></div>
                <div className="flex items-center justify-between px-5 bg-white shadow-2xl w-2/7 h-36 rounded-2xl ">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary">
                      <div className="flex items-center justify-center bg-red-500 rounded-full w-14 h-14"></div>
                    </div>
                    <div className="flex flex-col justify-center ml-3">
                      <p className="w-8/12 mb-1 text-xl font-bold leading-6 text-secondary">
                        The Front Page of Foods
                      </p>
                      <p className="w-8/12 text-sm font-medium text-lightGray">
                        /fa/foods
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center justify-center w-24 py-2 font-semibold text-white rounded-full outline-none cursor-pointer drop-shadow-md focus:outline-none bg-gradient-to-r from-primary to-secondary">
                    Join
                  </div>
                </div>
              </div>
              {postsMarkup}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
