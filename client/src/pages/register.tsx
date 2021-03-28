import Head from "next/head";

export default function Register() {
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
        <div className="flex flex-col items-center justify-center w-5/12 h-full bg-white">
          <div className="flex flex-col items-center justify-center w-9/12">
            <p className="mb-1 text-4xl font-bold text-center font-body text-secondary">
              Sign up to
            </p>
            <p className="mb-3 text-5xl font-bold text-center font-body text-primary">
              Food Allergy Initiative
            </p>
            <p className="w-4/12 mb-8 text-sm text-center text-minimal font-body">
              By signing up, you agree to our terms and conditions.
            </p>
            <input
              placeholder="Email"
              className="w-11/12 px-6 py-3 border rounded-full outline-none mb-14 bg-secondary font-body"
            />
            <input
              placeholder="Username"
              className="w-11/12 px-6 py-3 border rounded-full outline-none mb-14 bg-secondary font-body"
            />
            <input
              placeholder="Password"
              className="w-11/12 px-6 py-3 border rounded-full outline-none mb-14 bg-secondary font-body"
            />
            <button className="w-4/12 py-3 mb-10 font-semibold text-white rounded-full shadow-xl outline-none bg-green font-body">
              Sign up
            </button>
            <p className="text-sm text-secondary font-body">
              Already a user?{" "}
              <span className="text-sm text-primary font-body">Log in.</span>
            </p>
          </div>
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
