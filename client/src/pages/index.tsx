import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import useSWR from "swr";

import { Post } from "../types";

import PostCard from "../components/PostCard";

dayjs.extend(relativeTime);

export default function Home() {
  const { data: posts } = useSWR("/posts");

  return (
    <div className="flex w-full pt-vh">
      <Head>
        <title>FA Intiative</title>
      </Head>
      <div className="flex w-full h-92v">
        <Sidebar />

        <div className="flex flex-col items-center w-full h-full pt-8 bg-transparent pl-1/18">
          {posts?.map((post) => (
            <PostCard post={post} key={post.identifier} />
          ))}
        </div>
      </div>
    </div>
  );
}
