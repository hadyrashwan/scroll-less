import { auth } from "@/auth";
import Link from "next/link";
import { SignOut } from "./sign-out";

export default async function LoggedIn() {
    const session = await auth();

    return (
        <div className="flex items-center justify-center">
            <div className="flex items-center space-x-4">
                <h2 className="">{session?.user?.email}</h2>
                <Link href="/profile" className="text-blue-500 hover:underline">My Profile</Link>
                <SignOut />
            </div>
        </div>
    );
}
