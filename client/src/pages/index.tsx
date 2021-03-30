import Head from "next/head";
import Link from "next/link";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex w-full pt-vh">
      <Head>
        <title>FA Intiative</title>
      </Head>
      <Sidebar />
    </div>
  );
}
