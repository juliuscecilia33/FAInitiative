import Head from "next/head";

export default function Register() {
  return (
    <div className="flex flex-col">
      <Head>
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full flex justify-center items-center h-7v bg-white border-b border-primary">
        <img className="h-auto" src="/images/Logo.png" />
      </div>

      <div className="w-full h-93v bg-red-500 flex"></div>
    </div>
  );
}
