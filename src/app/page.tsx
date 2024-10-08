
import Navbar from "@/components/nav-bar";
import Head from "next/head";

export default async function Home() {

  return (
    <div>
            <Head>
        <link rel="png" href="/logos/logo.png" />
      </Head>
      <Navbar></Navbar>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">


      <h1> This is the explore page to be updated soon.</h1>

        <div className="flex gap-4 items-center flex-col sm:flex-row"></div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
    </div>
  );
}
