import Image from "next/image";
import { Sub } from "../types";
import Link from "next/link";
import useSWR from "swr";
import { useAuthState } from "../context/auth";
import AboutAssembly from "./AboutAssembly";

export default function AssembliesAndSub({ sub }) {
  const { data: topSubs } = useSWR("/misc/top-subs");

  return (
    <div className="flex flex-col items-center w-4/20">
      <AboutAssembly sub={sub} />
      <button className="flex items-center justify-center px-6 py-3 mb-6 font-semibold text-white rounded-full outline-none focus:outline-none bg-gradient-to-r from-primary to-secondary">
        <i className="h-auto mr-2 text-base text-white fas fa-plus"></i>
        Create Assembly
      </button>
      <div className="flex flex-col w-full p-6 bg-white shadow-2xl rounded-4xl">
        <p className="mb-4 text-2xl text-secondary font-secondary">
          Assemblies
        </p>
        {topSubs?.map((sub: Sub) => (
          <div
            key={sub.name}
            className="flex items-center justify-between w-full mb-4 bg-transparent"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 mr-2 overflow-hidden rounded-full shadow-md cursor-pointer bg-gradient-to-r from-primary to-secondary">
                <Link href={`/fa/${sub.name}`}>
                  <Image
                    src={sub.imageUrl}
                    alt="Sub"
                    width={100}
                    height={100}
                  />
                </Link>
              </div>
              <Link href={`/fa/${sub.name}`}>
                <a className="text-base font-medium truncate cursor-pointer w-28 hover:underline text-green">
                  /fa/{sub.name}
                </a>
              </Link>
            </div>
            <div className="flex items-center">
              <i className="mr-2 text-base text-green fas fa-arrow-up"></i>
              <div className="flex items-center justify-center text-base font-bold rounded-full w-9 h-9 bg-secGray">
                {sub.postCount}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
