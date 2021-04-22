import Head from "next/head";
import { Fragment } from "react";
import Sidebar from "../components/Sidebar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR from "swr";

import { Post, Sub } from "../types";

import PostCard from "../components/PostCard";
import Image from "next/image";
import Link from "next/link";

dayjs.extend(relativeTime);

export default function Home() {
  const { data: posts } = useSWR("/posts");
  const { data: topSubs } = useSWR("/misc/top-subs");

  return (
    <Fragment>
      <Head>
        <title>FA Intiative</title>
      </Head>
      <div className="flex w-full pr-20">
        <Sidebar />

        <div className="flex flex-col items-end w-10/12 pt-8 bg-transparent px-2/18">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>

        <div className="flex flex-col items-center w-2/12 mt-20">
          <button className="flex items-center justify-center w-9/12 py-3 mb-6 font-semibold text-white rounded-full outline-none focus:outline-none bg-gradient-to-r from-primary to-secondary">
            <i className="h-auto mr-2 text-base text-white fas fa-plus"></i>
            Create Assembly
          </button>
          <div className="flex flex-col w-full p-6 bg-white shadow-2xl h-50v rounded-4xl">
            <p className="mb-4 text-2xl text-secondary font-secondary">
              Assemblies
            </p>
            {topSubs?.map((sub: Sub) => (
              <div
                key={sub.name}
                className="flex items-center justify-between w-full mb-4 bg-transparent"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 mr-2 overflow-hidden rounded-full shadow-md cursor-pointer bg-gradient-to-r from-primary to-secondary">
                    <Image
                      src={sub.imageUrl}
                      alt="Sub"
                      width={100}
                      height={100}
                    />
                  </div>
                  <Link href={`/fa/${sub.name}`}>
                    <a className="text-base font-medium cursor-pointer hover:underline text-green">
                      /fa/{sub.name}
                    </a>
                  </Link>
                </div>
                <div className="flex items-center">
                  <i className="mr-2 text-base text-green fas fa-arrow-up"></i>
                  <div className="flex items-center justify-center text-base font-bold rounded-full w-9 h-9 bg-secGray">
                    {sub.postCount}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}
