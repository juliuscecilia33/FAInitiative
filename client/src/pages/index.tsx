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
import Assemblies from "../components/Assemblies";

dayjs.extend(relativeTime);

export default function Home() {
  const { data: posts } = useSWR("/posts");
  const { data: topSubs } = useSWR("/misc/top-subs");

  return (
    <Fragment>
      <Head>
        <title>FA Intiative</title>
      </Head>
      <div className="flex w-full pr-10">
        <Sidebar />

        <div className="flex flex-col items-end pt-8 bg-transparent w-14/18 pl-2/18 pr-1/18">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>

        <Assemblies />
      </div>
    </Fragment>
  );
}
