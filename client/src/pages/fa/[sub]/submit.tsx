import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import { Sub } from "../../../types";
import useSWR from "swr";
import AboutAssembly from "../../../components/AboutAssembly";
import Head from "next/head";

export default function submit() {
  const router = useRouter();
  const { sub: subName } = router.query;

  const {
    data: sub,
    error,
    revalidate,
  } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

  if (error) router.push("/");

  return (
    <div className="flex w-full">
      <Head>
        <title>Submit to FA Initiative</title>
      </Head>
      <Sidebar />
      {sub && <AboutAssembly sub={sub} />}
    </div>
  );
}
