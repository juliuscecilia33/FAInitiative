// 9:44 #15

import Head from "next/head";
import { useRouter } from "next/router";
import { createRef, Fragment, useEffect, useState } from "react";
import useSWR from "swr";
import PostCard from "../../components/PostCard";
import Sidebar from "../../components/Sidebar";
import { Sub } from "../../types";
import { useAuthState } from "../../context/auth";
import Image from "next/image";
import classNames from "classnames";

export default function SubPage() {
  // Local State
  const [ownSub, setOwnSub] = useState(false);

  // Global State
  const { authenticated, user } = useAuthState();

  // Utils
  const router = useRouter();

  const fileInputRef = createRef<HTMLInputElement>();

  const subName = router.query.sub;

  const { data: sub, error } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

  useEffect(() => {
    if (!sub) return;
    setOwnSub(authenticated && user.username === sub.username);
  }, [sub]);

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

      <div className="flex w-full">
        <Sidebar />

        {sub && (
          <Fragment>
            <input type="file" hidden={true} ref={fileInputRef} />
            {/* Sub info and images */}
            {/* Posts and Sidebar */}
            <div className="flex flex-col items-center w-full pt-8 bg-transparent pl-1/18">
              <div className="flex items-center justify-around w-full px-20 mb-20">
                <div
                  className={classNames(
                    "h-56 bg-gradient-to-r from-primary to-secondary w-4/7 rounded-2xl",
                    { "cursor-pointer": ownSub }
                  )}
                >
                  {sub.bannerUrl ? (
                    <div
                      className="w-full h-56 shadow-2xl rounded-2xl bg-gradient-to-r from-primary to-secondary"
                      style={{
                        backgroundImage: `url(${sub.bannerUrl})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    ></div>
                  ) : (
                    <div className="w-full h-56 shadow-2xl rounded-2xl bg-gradient-to-r from-primary to-secondary"></div>
                  )}
                </div>
                <div className="flex items-center justify-between px-5 bg-white shadow-2xl w-2/7 h-36 rounded-2xl ">
                  <div className="flex items-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-primary to-secondary">
                      <div className="flex items-center justify-center bg-red-500 rounded-full w-14 h-14">
                        <Image
                          src={sub.imageUrl}
                          alt="Sub"
                          className={classNames("rounded-full", {
                            "cursor-pointer": ownSub,
                          })}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col justify-center w-8/12 ml-3">
                      <p className="mb-1 text-xl font-bold leading-6 text-secondary">
                        {sub.title}
                      </p>
                      <p className="text-sm font-medium text-lightGray">
                        /fa/{sub.name}
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
