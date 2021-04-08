import { useRouter } from "next/router";
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
    <div className="flex w-full h-92v">
      <Sidebar />
      <div className="flex flex-col items-center w-full h-full pt-8 bg-transparent">
        {postsMarkup}
      </div>
    </div>
  );
}
