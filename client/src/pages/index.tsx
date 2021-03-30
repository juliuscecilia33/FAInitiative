import Head from "next/head";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Head>
        <title>FA Intiative</title>
      </Head>
      <div className="fixed inset-x-0 top-0 z-10 flex items-center justify-between w-full px-8 bg-transparent border-b-2 h-8v border-primary">
        <img className="h-auto" src="/images/Logo.png" />
        <div className="flex items-center mx-auto border rounded-full bg-secondary font-body focus:bg-white hover:bg-white">
          <i className="fas fa-search"></i>
          <input
            type="text"
            placeholder="Search"
            className="flex items-center py-2 pr-3 mb-1 transition duration-200 bg-transparent outline-none"
            // value={value}
            // onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-center">
          <button className="w-32 py-2 mr-4 font-semibold rounded-full text-green">
            Log in
          </button>
          <button className="w-32 py-2 font-semibold text-white rounded-full bg-green">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
