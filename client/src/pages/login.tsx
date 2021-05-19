import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";

import { useAuthDispatch, useAuthState } from "../context/auth";

import InputGroup from "../components/InputGroup";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const dispatch = useAuthDispatch();
  const { authenticated } = useAuthState();

  const router = useRouter();

  if (authenticated) router.push("/");

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await Axios.post("/auth/login", {
        username,
        password,
      });

      dispatch("LOGIN", res.data);

      router.back();
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex flex-col">
      <Head>
        <title>Login</title>
      </Head>

      <div className="flex items-center justify-center w-full bg-white border-b h-7v border-primary">
        <Link href="/">
          <img className="h-auto cursor-pointer" src="/images/Logo.png" />
        </Link>
      </div>

      <div className="flex w-full bg-white h-93v">
        <div className="flex flex-col items-center justify-center w-7/12 h-full bg-secondary">
          <img className="w-10/12 h-auto m-2" src="/images/Page3.png" />
          <div className="flex flex-col items-center justify-center w-8/12 mb-6">
            <p className="text-3xl text-primary m-3.5 font-bold text-center font-body">
              Share your own story or post new discoveries
            </p>
            <p className="w-7/12 text-base text-center font-body text-secondary">
              Be able to share your own experiences or post new discoveries
              where other can find you through their feed or assemblies.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-5/12 h-full py-3 bg-white">
          <form
            className="flex flex-col items-center justify-center w-full"
            style={{ height: "100%" }}
            onSubmit={submitForm}
          >
            <div
              className="flex flex-col items-center justify-center w-9/12"
              style={{ height: "100%" }}
            >
              <p className="mb-1 text-4xl font-bold text-center font-body text-secondary">
                Log in to
              </p>
              <p className="mb-3 text-5xl font-bold text-center font-body text-primary">
                Food Allergy Initiative
              </p>
              <p className="w-4/12 mb-8 text-sm text-center text-minimal font-body">
                By signing in, you agree to our terms and conditions.
              </p>
              <div className="flex justify-center w-full my-6">
                <InputGroup
                  value={username}
                  setValue={setUsername}
                  placeholder="Username"
                  error={errors.username}
                  type="text"
                  maxLength={null}
                />
              </div>
              <div className="flex justify-center w-full my-6">
                <InputGroup
                  value={password}
                  setValue={setPassword}
                  placeholder="Password"
                  error={errors.password}
                  type="password"
                  maxLength={null}
                />
              </div>
              <button className="w-4/12 py-3 mt-6 mb-10 font-semibold text-white rounded-full shadow-xl outline-none bg-gradient-to-r from-primary to-secondary font-body">
                Log in
              </button>
              <p className="text-sm text-secondary font-body">
                Not a user?{" "}
                <Link href="/register">
                  <a className="text-sm text-primary font-body">Sign up.</a>
                </Link>
              </p>
            </div>
            <div className="flex flex-wrap items-end justify-center w-11/12">
              <img className="mb-3 mr-14" src="/images/FAOutlets.png" />
              <img className="mb-3 mr-14" src="/images/Youtube.png" />
              <img className="mb-3 mr-14" src="/images/LinkedIn.png" />
              <img className="mb-3 mr-14" src="/images/Facebook.png" />
              <img className="mb-3 mr-14" src="/images/Twitter.png" />
              <img className="mb-3 mr-14" src="/images/Instagram.png" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
