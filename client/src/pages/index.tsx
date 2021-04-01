import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";

import { Post } from "../types";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    Axios.get("/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex w-full pt-vh">
      <Head>
        <title>FA Intiative</title>
      </Head>
      <div className="flex w-full h-92v">
        <Sidebar />

        <div className="flex flex-col items-center w-full h-full pt-8 bg-transparent pl-1/18">
          {posts.map((post) => (
            <div
              key={post.identifier}
              className="flex flex-col items-center w-6/12 bg-white shadow-2xl h-52 rounded-tl-4xl rounded-tr-4xl rounded-bl-3.5xl rounded-br-3.5xl mb-12"
            >
              <div className="flex items-center justify-between w-full px-10 bg-secondary h-2/7 rounded-tl-4xl rounded-tr-4xl">
                <div className="flex items-center justify-center">
                  <p className="text-base text-secondary">
                    Posted by{" "}
                    <span className="font-medium text-green">/u/julius</span>
                  </p>
                  <i className="mx-3 text-gray-300 text-xs2 fas fa-circle"></i>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
                <div className="flex items-center justify-center">
                  <div className="flex items-center justify-center mx-3">
                    <i className="mr-2 text-2xl fas fa-heartbeat text-green"></i>
                    <p className="text-sm font-semibold">28</p>
                  </div>
                  <div className="flex items-center justify-center mx-3">
                    <i className="mr-2 text-2xl fas fa-comment-dots text-green"></i>
                    <p className="text-sm font-semibold">5</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col justify-between w-full px-10 py-4 h-4/7">
                <p className="text-xl font-bold truncate text-secondary">
                  {post.body}
                </p>
                <div className="flex items-center">
                  <div className="flex items-center justify-center mr-5">
                    <i className="mr-2 text-2xl fas fa-heartbeat text-green"></i>
                    <p className="text-sm font-semibold">Love</p>
                  </div>
                  <div className="flex items-center justify-center">
                    <i className="mr-2 text-2xl fas fa-comment-dots text-green"></i>
                    <p className="text-sm font-semibold">Comment</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-full px-10 text-sm rounded-bl-full rounded-br-full bg-green h-1/7">
                <img
                  className="w-5 h-auto mr-2"
                  src="/images/companylogo.png"
                  alt="company logo"
                />
                <p className="text-white">/fa/stores</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
