// #20 10:39

import Link from "next/link";
import Axios from "axios";
import { Fragment, useState } from "react";

import { useAuthState, useAuthDispatch } from "../context/auth";
import { Sub } from "../types";
import Image from "next/image";

const Navbar: React.FC = () => {
  const [name, setName] = useState("");
  const [subs, setSubs] = useState<Sub[]>([]);

  const { authenticated, loading } = useAuthState();
  const dispatch = useAuthDispatch();

  const logout = () => {
    Axios.get("/auth/logout")
      .then(() => {
        dispatch("LOGOUT");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const searchSubs = async (subName: string) => {
    setName(subName);

    try {
      const { data } = await Axios.get(`/subs/search/${subName}`);
      setSubs(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between w-full px-8 bg-white border-b h-8v border-primary">
      <Link href="/">
        <img
          className="h-auto cursor-pointer"
          src="/images/Logo.png"
          alt="logo"
        />
      </Link>
      <div className="relative flex items-center w-3/12 px-5 ml-10 border rounded-full bg-secondary font-body focus:bg-white hover:bg-white">
        <i className="mr-3 text-gray-400 fas fa-search"></i>
        <input
          type="text"
          placeholder="Search"
          className="w-full py-2 pr-3 transition duration-200 bg-transparent outline-none"
          value={name}
          onChange={(e) => searchSubs(e.target.value)}
        />
        <div
          className="absolute left-0 right-0 bg-white"
          style={{ top: "100%" }}
        >
          {subs?.map((sub) => (
            <div className="flex items-center px-4 py-3 rounded-lg shadow-xl cursor-pointer hover:bg-gray-200">
              <div className="flex overflow-hidden">
                <Image
                  src={sub.imageUrl}
                  className="rounded-full"
                  alt="Sub"
                  height={40}
                  width={40}
                />
                <div className="flex flex-col ml-4 text-sm">
                  <div className="font-medium">{sub.name}</div>
                  <p className="text-gray-600">{sub.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-center">
        {!loading &&
          (authenticated ? (
            <button
              className="w-32 py-2 font-semibold text-white rounded-full outline-none focus:outline-none bg-gradient-to-r from-primary to-secondary"
              onClick={logout}
            >
              Log out
            </button>
          ) : (
            <Fragment>
              <Link href="/login">
                <button className="w-32 py-2 mr-4 font-semibold transition rounded-full focus:outline-none text-green hover:bg-gray-200 hover:text-green">
                  Log in
                </button>
              </Link>
              <Link href="/register">
                <button className="w-32 py-2 font-semibold text-white rounded-full outline-none focus:outline-none bg-gradient-to-r from-primary to-secondary">
                  Sign up
                </button>
              </Link>
            </Fragment>
          ))}
      </div>
    </div>
  );
};

export default Navbar;
