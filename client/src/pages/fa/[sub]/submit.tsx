import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import { Post, Sub } from "../../../types";
import useSWR from "swr";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "../../../components/InputGroup";
import { FormEvent, useState } from "react";
import TextAreaGroup from "../../../components/TextAreaGroup";
import Axios from "axios";
import { GetServerSideProps } from "next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuthState } from "../../../context/auth";

dayjs.extend(relativeTime);

export default function submit() {
  const router = useRouter();
  const { sub: subName } = router.query;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const { data: sub, error } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

  const submitPost = async (event: FormEvent) => {
    event.preventDefault();

    if (title.trim() === "") return;

    try {
      const { data: post } = await Axios.post<Post>("/posts", {
        title: title.trim(),
        body,
        sub: sub.name,
      });

      router.push(`/fa/${sub.name}/${post.identifier}/${post.slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  if (error) router.push("/");

  const { authenticated, user } = useAuthState();

  return (
    <div className="flex w-full">
      <Head>
        <title>Submit to FA Initiative</title>
      </Head>
      <Sidebar />
      <div className="flex flex-col items-center w-full pl-1/18">
        <div className="flex items-center justify-center w-full px-20 py-4 bg-green">
          <p className="text-xl font-semibold text-white ">
            Submit a post to /fa/{subName}
          </p>
          <i className="mx-6 text-gray-300 text-xs2 fas fa-circle"></i>
          <p className="text-sm text-greyColour">
            Posted by{" "}
            <Link href={`/u/julius`}>
              <span className="font-medium cursor-pointer text-secLightGray hover:underline">
                /u/julius
              </span>
            </Link>
          </p>
        </div>
        <div className="flex flex-col items-center w-full pb-10 mx-auto rounded-4xl mb-14">
          <div className="flex flex-col items-center w-7/12 bg-white shadow-2xl h-52 rounded-tl-4xl rounded-tr-4xl rounded-bl-3.5xl rounded-br-3.5xl my-14">
            <div className="flex items-center justify-between w-full px-10 bg-secondary h-2/7 rounded-tl-4xl rounded-tr-4xl">
              <div className="flex items-center justify-center">
                {authenticated && (
                  <p className="text-base text-secondary">
                    Posted by{" "}
                    <Link href={`/u/${user.username}`}>
                      <span className="font-medium cursor-pointer text-green hover:underline">
                        /u/{user.username}
                      </span>
                    </Link>
                  </p>
                )}
                <i className="mx-3 text-gray-300 text-xs2 fas fa-circle"></i>
                <Link href={`/`}>
                  <p className="text-xs text-gray-400 cursor-pointer hover:underline">
                    Now
                  </p>
                </Link>
              </div>
              <div className="flex items-center justify-center">
                <div className="flex items-center justify-center mx-3">
                  <i className="mr-2 text-2xl fas fa-heartbeat text-green"></i>
                  <p className="text-sm font-semibold">0</p>
                </div>
                <div className="flex items-center justify-center mx-3">
                  <i className="mr-2 text-2xl fas fa-comment-dots text-green"></i>
                  <p className="text-sm font-semibold">0</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between w-full px-10 py-2 h-4/7">
              <div className="flex flex-col w-full cursor-pointer">
                <p className="mb-1 text-xl font-bold truncate text-secondary">
                  {title}
                </p>
                <p className="text-sm truncate text-secondary">{body}</p>
              </div>
              <div className="flex items-center">
                <div className="flex items-center justify-center px-2 mr-5 text-gray-300 transition rounded cursor-pointer hover:bg-gray-200 hover:text-green">
                  <i className="mr-2 text-2xl cursor-pointer fas fa-heartbeat text-green"></i>
                  <p className="text-sm font-semibold">Love</p>
                </div>
                <div className="flex items-center justify-center px-2 text-gray-300 transition rounded cursor-pointer hover:bg-gray-200 hover:text-green">
                  <i className="mr-2 text-2xl cursor-pointer fas fa-comment-dots"></i>
                  <p className="text-sm font-semibold cursor-pointer">
                    Comment
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-full px-10 text-sm rounded-bl-full rounded-br-full bg-gradient-to-r from-primary to-secondary h-1/7">
              <Link href={`/fa/${subName}`}>
                <div
                  className="w-6 h-6 mr-2 rounded-full cursor-pointer"
                  style={{
                    backgroundImage: `url("/images/companylogo.png")`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </Link>
              <Link href={`/fa/${subName}`}>
                <a className="text-white transition hover:underline">
                  /fa/{subName}
                </a>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center w-6/12 px-6 mt-6">
            <div className="flex flex-col items-center w-full mb-8">
              <InputGroup
                value={title}
                setValue={setTitle}
                placeholder="Title"
                error={null}
                type="text"
                maxLength={300}
              />
              <div className="self-start pl-12 mt-1 text-sm text-gray-500 select-none">
                {title.trim().length}/300
              </div>
            </div>
            <div className="flex flex-col items-center w-full mb-8">
              <TextAreaGroup
                value={body}
                setValue={setBody}
                placeholder="Description (optional)"
                error={null}
                maxLength={1000}
              />
              <div className="self-start pl-12 mt-1 text-sm text-gray-500 select-none">
                {body.trim().length}/1000
              </div>
            </div>
          </div>
          <div className="flex justify-center w-full px-14">
            <button
              disabled={title.trim() === ""}
              onClick={submitPost}
              className="flex items-center justify-center px-8 py-2 font-semibold text-white rounded-full outline-none cursor-pointer drop-shadow-md focus:outline-none bg-gradient-to-r from-primary to-secondary"
            >
              <i className="h-auto mr-2 text-base text-white fas fa-plus"></i>
              Create Post
            </button>
          </div>
        </div>
      </div>

      {sub && (
        <Link href={`/fa/${sub.name}`}>
          <div className="fixed bottom-0 z-10 flex items-center justify-center cursor-pointer left-1/18 w-17/18 h-4v bg-gradient-to-r from-primary to-secondary">
            <div className="mr-2 overflow-hidden rounded-full w-7 h-7">
              <Image src={sub.imageUrl} height={100} width={100} />
            </div>
            <p className="text-base text-white hover:underline">{`/fa/${sub.name}`}</p>
          </div>
        </Link>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  try {
    const cookie = req.headers.cookie;
    if (!cookie) throw new Error("Missing auth token cookie");

    await Axios.get("/auth/me", { headers: { cookie } });

    return { props: {} };
  } catch (err) {
    res.writeHead(307, { Location: "/login" }).end(); // status codes w 300 are redirect
  }
};
