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

        <div className="flex justify-center w-full h-full bg-transparent pl-1/18">
          <p>hello</p>
        </div>
      </div>
    </div>
  );
}
