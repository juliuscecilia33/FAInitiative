import Head from "next/head";
import Link from "next/link";
import Sidebar from "../../../../components/Sidebar";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function PostPage() {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  const { data: post, error } = useSWR(
    identifier && slug ? `/posts/${identifier}/${slug}` : null
  );

  if (error) router.push("/");

  return (
    <>
      <Head>
        <title>{post?.title}</title>
      </Head>
      <div className="flex w-full">
        <Sidebar />

        <Link href={`/fa/${sub}`}>
          <div className="fixed bottom-0 flex items-center justify-center right-10 w-17/18 h-4v bg-gradient-to-r from-primary to-secondary">
            Hello
          </div>
        </Link>
      </div>
    </>
  );
}
