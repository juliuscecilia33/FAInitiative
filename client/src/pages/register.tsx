import { FormEvent, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Axios from "axios";
import { useRouter } from "next/router";
import InputGroup from "../components/InputGroup";

export default function Register() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [agreement, setAgreement] = useState(false);
  const [errors, setErrors] = useState<any>({});

  const router = useRouter();

  const submitForm = async (event: FormEvent) => {
    event.preventDefault();

    if (!agreement) {
      setErrors({ ...errors, agreement: "You must agree to T&Cs" });
      return;
    }

    try {
      await Axios.post("/auth/register", {
        email,
        password,
        username,
      });

      router.push("/login");
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="flex flex-col">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex items-center justify-center w-full bg-white border-b h-7v border-primary">
        <img className="h-auto" src="/images/Logo.png" />
      </div>

      <div className="flex w-full bg-white h-93v">
        <div className="flex flex-col items-center justify-center w-5/12 h-full py-3 bg-white">
          <form
            className="flex flex-col items-center justify-center w-full"
            style={{ height: "100%" }}
          >
            <div
              className="flex flex-col items-center justify-center w-9/12"
              style={{ height: "100%" }}
            >
              <p className="mb-1 text-4xl font-bold text-center font-body text-secondary">
                Sign up to
              </p>
              <p className="mb-3 text-5xl font-bold text-center font-body text-primary">
                Food Allergy Initiative
              </p>
              <p className="w-4/12 mb-8 text-sm text-center text-minimal font-body">
                By signing up, you agree to our terms and conditions.
              </p>
              <InputGroup
                value={email}
                setValue={setEmail}
                placeholder="Email"
                error={errors.email}
                type="email"
              />
              <InputGroup
                value={username}
                setValue={setUsername}
                placeholder="Username"
                error={errors.Username}
                type="text"
              />
              <InputGroup
                value={password}
                setValue={setPassword}
                placeholder="Password"
                error={errors.password}
                type="password"
              />
              <div className="flex items-center justify-center mb-8">
                <input
                  type="checkbox"
                  className="mr-1 cursor-pointer"
                  id="agreement"
                  checked={agreement}
                  onChange={(e) => setAgreement(e.target.checked)}
                />
                <label
                  htmlFor="agreement"
                  className="text-xs cursor-pointer font-body"
                >
                  I agree to get emails about FA Initiative
                </label>
                <small className="block font-medium text-red-600">
                  {errors.agreement}
                </small>
              </div>
              <button className="w-4/12 py-3 mb-10 font-semibold text-white rounded-full shadow-xl outline-none bg-green font-body">
                Sign up
              </button>
              <p className="text-sm text-secondary font-body">
                Already a user?{" "}
                <Link href="/login">
                  <a className="text-sm text-primary font-body">Log in.</a>
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

        <div className="flex flex-col items-center justify-center w-7/12 h-full bg-secondary">
          <img className="w-10/12 h-auto m-2" src="/images/Page1.png" />
          <div className="flex flex-col items-center justify-center w-8/12 mb-6">
            <p className="text-3xl text-primary m-3.5 font-bold text-center font-body">
              Find or create assemblies to meet other people
            </p>
            <p className="w-7/12 text-base text-center font-body text-secondary">
              Check out assemblies that each discuss their own topic such as
              experiences, recipes, foods, stores, and more. You can also create
              your assembly and have other people join it!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
