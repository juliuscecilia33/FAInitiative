import Head from "next/head";
import Link from "next/link";
import Sidebar from "../../../../components/Sidebar";
import { useRouter } from "next/router";
import useSWR from "swr";
import Image from "next/image";
import { Post } from "../../../../types";
import AssembliesAndSub from "../../../../components/AssembliesAndSub";

export default function PostPage() {
  const router = useRouter();
  const { identifier, sub, slug } = router.query;

  const { data: post, error } = useSWR<Post>(
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

        <div className="flex items-center justify-end w-full py-8 pr-14 pl-1/18">
          <div className="flex flex-col w-5/12 p-12 mx-auto mt-12 bg-white shadow-2xl rounded-4xl">
            <div className="flex justify-between w-full">
              <div className="flex-col w-10/12">
                <div className="flex items-center mb-4">
                  <p className="text-sm text-secondary">
                    Posted by{" "}
                    <span className="font-medium cursor-pointer text-green hover:underline">
                      /u/username
                    </span>
                  </p>
                  <i className="mx-3 text-gray-300 text-xs2 fas fa-circle"></i>
                  <p className="text-xs text-gray-400 cursor-pointer hover:underline">
                    {/* {dayjs(createdAt).fromNow()} */}2 hours ago
                  </p>
                </div>
                <p className="w-11/12 mb-4 text-xl font-bold text-secondary">
                  Check out Arrowhead Mills! They have so much allergy-friendly
                  foods! Arrowhead Mills has been one of America’s most trusted
                  organic baking brands for 50 years.
                </p>
                <p className="w-10/12 text-base text-gray-400">
                  Body Description
                </p>
              </div>
              <div className="flex flex-col items-center justify-center w-1/12 h-24 rounded-4xl bg-secondary">
                <i className="my-1 text-2xl fas fa-heartbeat text-green"></i>
                <p className="font-bold text-secondary">25</p>
              </div>
            </div>
            <div className="flex-col w-full py-8 mt-24">
              <p className="text-sm">
                Comment as <span className="text-green">julius</span>
              </p>
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
