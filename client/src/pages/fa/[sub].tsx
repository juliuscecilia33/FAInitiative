import { useRouter } from "next/router";
import useSWR from "swr";
import PostCard from "../../components/PostCard";
import Sidebar from "../../components/Sidebar";

export default function Sub() {
  const router = useRouter();

  const subName = router.query.sub;

  const { data: sub } = useSWR(subName ? `/subs/${subName}` : null);

  return (
    <div className="flex w-full h-92v">
      <Sidebar />
      <div className="flex flex-col items-center w-full h-full pt-8 bg-transparent">
        {sub && (
          <div className="flex flex-col items-center justify-center w-full">
            {sub.posts.map((post) => (
              <PostCard key={post.identifier} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
