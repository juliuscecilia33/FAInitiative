import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { Fragment, useEffect, useState } from "react";
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

        <div className="w-2/12 mt-20 bg-white shadow-2xl h-50v rounded-4xl"></div>
      </div>
    </Fragment>
  );
}
