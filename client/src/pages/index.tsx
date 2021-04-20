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

        <div className="flex flex-col items-center w-2/12 mt-20">
          <button className="flex items-center justify-center w-9/12 py-3 mb-6 font-semibold text-white rounded-full outline-none focus:outline-none bg-gradient-to-r from-primary to-secondary">
            <i className="h-auto mr-2 text-base text-white fas fa-plus"></i>
            Create Assembly
          </button>
          <div className="flex flex-col w-full p-6 bg-white shadow-2xl h-50v rounded-4xl">
            <p className="mb-4 text-2xl text-secondary font-secondary">
              Assemblies
            </p>
            <div className="flex items-center w-full bg-transparent">
              <div className="flex items-center">
                <div
                  className="w-10 h-10 mr-2 rounded-full shadow-md cursor-pointer bg-gradient-to-r from-primary to-secondary"
                  style={{
                    backgroundImage: `url("/images/Page3.png")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
                <p className="text-base font-medium cursor-pointer hover:underline text-green">
                  /fa/stories
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
