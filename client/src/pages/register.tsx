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
            <p className="mb-1 text-3xl font-bold text-center font-body text-secondary">
              Sign up to
            </p>
            <p className="text-4xl font-bold text-center font-body text-primary">
              Food Allergy Initiative
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-7/12 h-full bg-secondary">
          <img className="w-10/12 h-auto m-2" src="/images/Page1.png" />
          <div className="flex flex-col items-center justify-center w-8/12">
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
