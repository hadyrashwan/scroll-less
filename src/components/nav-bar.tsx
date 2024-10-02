import Link from "next/link";
import { SignIn } from "@/components/sign-in";
import LoggedIn from "@/components/logged-in";
import { auth } from "@/auth";

export default async function NavBar() {
  const session = await auth();

  return (
    <nav className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-900 shadow-md rounded">
      <div className="flex items-center gap-4">
        <ul className="flex gap-6">
          <li>
            <Link href="/" className="dark:text-gray-300 text-blue-500 hover:underline">
              Explore
            </Link>
          </li>
        </ul>
      </div>

        <span className="text-sm font-bold text-gray-900 dark:text-gray-200">Scroll Less</span>
      <div className="flex items-center gap-4">
        {session ? (
          <LoggedIn />
        ) : (
          <SignIn />
        )}
      </div>
    </nav>
  );
}
