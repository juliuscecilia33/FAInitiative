import Link from "next/link";
import { useAuthState } from "../context/auth";
import dayjs from "dayjs";
import { Sub } from "../types";

export default function AboutAssembly({ sub }: { sub: Sub }) {
  const { authenticated } = useAuthState();

  return (
    <div className="flex flex-col w-full pb-6 mb-16 bg-white shadow-xl rounded-4xl">
      <div className="flex items-center w-full h-16 px-8 mb-4 bg-gradient-to-r from-primary to-secondary rounded-tl-4xl rounded-tr-4xl">
        <p className="text-xl font-semibold text-white ">About Assembly</p>
      </div>
      <p className="px-8 ">{sub.description}</p>
      <div className="flex px-8 my-6 font-medium">
        <div className="flex flex-col mr-12">
          <p className="text-lg font-bold text-green">20</p>
          <p className="text-sm">Members</p>
        </div>
        <div className="flex flex-col">
          <p className="text-lg font-bold text-green">16</p>
          <p className="text-sm">Online</p>
        </div>
      </div>
      <div className="flex items-center px-8 mb-5">
        <i className="mr-3 text-2xl fas fa-seedling text-green"></i>
        <p className="text-base text-gray-400">
          Created {dayjs(sub.createdAt).format("D MMM YYYY")}
        </p>
      </div>
      {authenticated && (
        <Link href={`/fa/${sub.name}/submit`}>
          <button className="flex items-center justify-center w-5/12 py-2 mx-auto text-sm font-semibold text-white rounded-full outline-none focus:outline-none bg-gradient-to-r from-primary to-secondary">
            <i className="h-auto mr-2 text-sm text-white fas fa-plus"></i>
            Create Post
          </button>
        </Link>
      )}
    </div>
  );
}
