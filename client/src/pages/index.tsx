import Head from "next/head";
import Link from "next/link";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex w-full pt-vh">
      <Head>
        <title>FA Intiative</title>
      </Head>
      <div className="flex w-full h-92v">
        <Sidebar />

        <div className="flex justify-center w-full h-full pt-8 bg-transparent pl-1/18">
          <div className="flex flex-col items-center w-6/12 h-40 bg-white shadow-2xl rounded-4xl">
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
          </div>
        </div>
      </div>
    </div>
  );
}
