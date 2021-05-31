import Head from "next/head";
import { useRouter } from "next/router";
import useSWR from "swr";
import Sidebar from "../../components/Sidebar";

export default function user() {
  const router = useRouter();
  const username = router.query.username;

  const { data, error } = useSWR<any>(username ? `/users/${username}` : null);

  if (error) router.push("/");

  if (data) console.log(data);

  return (
    <>
      <Head>
        <title>{data?.user.username}</title>
      </Head>
      {data && (
        <div className="flex w-full">
          <Sidebar />

          <div className="flex items-center justify-center bg-transparent bg-green w-17/18 ml-1/18 h-20v">
            <div className="flex items-center justify-center mr-16">
              <div className="w-20 h-20 mr-3 bg-gray-500 rounded-full"></div>
              <p className="text-2xl text-secLightGray">julius</p>
            </div>
            <div className="flex items-center justify-center px-10 py-4 text-base bg-white rounded-4xl text-secondary">
              Joined 6 Days ago
            </div>
          </div>
        </div>
      )}
    </>
  );
}
