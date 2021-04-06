import { useRouter } from "next/router";
import useSWR from "swr";
import PostCard from "../../components/PostCard";

export default function Sub() {
  const router = useRouter();

  const subName = router.query.sub;

  const { data: sub } = useSWR(subName ? `/subs/${subName}` : null);

  return (
    <div className="flex flex-col items-center w-full h-full pt-8 bg-transparent">
      {sub && (
        <div>
          {sub.posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
