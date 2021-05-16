import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import { Sub } from "../../../types";
import useSWR from "swr";
import AboutAssembly from "../../../components/AboutAssembly";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import InputGroup from "../../../components/InputGroup";
import { useState } from "react";
import TextAreaGroup from "../../../components/TextAreaGroup";

export default function submit() {
  const router = useRouter();
  const { sub: subName } = router.query;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const {
    data: sub,
    error,
    revalidate,
  } = useSWR<Sub>(subName ? `/subs/${subName}` : null);

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
            <p className="text-xl font-semibold text-white ">Create Post</p>
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
            <InputGroup
              value={title}
              setValue={setTitle}
              placeholder="Title"
              error={null}
              type="text"
            />
            <TextAreaGroup
              value={description}
              setValue={setDescription}
              placeholder="Description"
              error={null}
            />
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
