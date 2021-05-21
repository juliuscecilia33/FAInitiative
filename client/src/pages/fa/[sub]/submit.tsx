import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import { Post, Sub } from "../../../types";
import useSWR from "swr";
import AboutAssembly from "../../../components/AboutAssembly";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "../../../components/InputGroup";
import { FormEvent, useState } from "react";
import TextAreaGroup from "../../../components/TextAreaGroup";
import Axios from "axios";

export default function submit() {
  const router = useRouter();
  const { sub: subName } = router.query;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const {
    data: sub,
    error,
    revalidate,
  } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

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

  console.log(sub);

  return (
    <div className="flex w-full">
      <Head>
        <title>Submit to FA Initiative</title>
      </Head>
      <Sidebar />
      <div className="flex justify-end w-full mt-14 pr-14 pl-2/18">
        <div className="flex flex-col items-center w-6/12 pb-10 mx-auto bg-white shadow-2xl rounded-4xl mb-14">
          <div className="flex items-center w-full h-16 mb-4 px-14 bg-gradient-to-r from-primary to-secondary rounded-tl-4xl rounded-tr-4xl">
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
          <div className="flex flex-col items-center w-full px-6 mt-6">
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
          <div className="flex justify-end w-full px-14">
            <button
              disabled={title.trim() === ""}
              onClick={submitPost}
              className="flex items-center justify-center px-10 py-2 font-semibold text-white rounded-full outline-none cursor-pointer drop-shadow-md focus:outline-none bg-gradient-to-r from-primary to-secondary"
            >
              Submit
            </button>
          </div>
        </div>
        {sub && <AboutAssembly sub={sub} fullWidth={false} />}
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
