import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import useSWR from "swr";
import PostCard from "../../components/PostCard";
import Sidebar from "../../components/Sidebar";

export default function Sub() {
  const router = useRouter();

  const subName = router.query.sub;

  const { data: sub, error } = useSWR(subName ? `/subs/${subName}` : null);

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
              {postsMarkup}
            </div>
          </Fragment>
        )}
      </div>
    </div>
  );
}
