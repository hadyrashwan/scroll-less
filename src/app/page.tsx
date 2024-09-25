import Image from "next/image";

import { SignIn } from "@/components/sign-in";
import { auth } from "@/auth";
import LoggedIn from "@/components/logged-in";
import Navbar from "@/components/nav-bar";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <Navbar></Navbar>
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert rounded"
          src="/logos/small-180x38.webp"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        {session ? (
          <LoggedIn></LoggedIn>
        ) : (
          <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
            <SignIn></SignIn>
          </ol>
        )}

        <div className="flex gap-4 items-center flex-col sm:flex-row"></div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
    </div>
  );
}
