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

        <div className="flex items-center justify-end w-full py-6 pr-14 pl-1/18">
          <div className="flex flex-col mx-auto mt-12 bg-white shadow-2xl p-14 w-4/7 rounded-4xl">
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
              <div className="flex flex-col items-center justify-between py-5 h-28 w-1/18 rounded-4xl bg-secondary">
                <i className="text-2xl fas fa-heartbeat text-green"></i>
                <p className="font-bold text-secondary">25</p>
              </div>
            </div>
            <div className="flex-col w-full mt-24 mb-2">
              <p className="text-sm">
                Comment as <span className="text-green">julius</span>
              </p>
            </div>
            <div className="flex w-full h-48 px-5 mb-6 border rounded-2xl bg-secondary font-body focus:bg-white hover:bg-white">
              <textarea
                placeholder="Comment"
                className="w-full py-4 transition duration-200 bg-transparent outline-none"
                // value={value}
                // onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center px-8 py-2 ml-auto text-sm font-semibold text-white rounded-full outline-none focus:outline-none bg-gradient-to-r from-primary to-secondary">
              <i className="h-auto mr-2 text-base text-white fas fa-comment"></i>
              Comment
            </button>
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
