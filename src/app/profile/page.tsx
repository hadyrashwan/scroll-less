import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth"
import Link from "next/link";
import Navbar from "@/components/nav-bar";
import AddFeed from "@/components/add-feed";
import AddPost from "@/components/add-post";
import ListMyFeeds from "@/components/list-my-feeds";

export default async function Page() {


    const session = await auth()

    return  session ? (
    <div>
    <Navbar></Navbar>
    <h1>Hello,  My profile</h1>
    <h2> {session?.user?.id }  </h2>
    <h2> {session?.user?.email }  </h2>
    <pre>{JSON.stringify(session)}</pre>
        <SignOut></SignOut>

        <AddFeed></AddFeed>
        <AddPost></AddPost>
        <h1>Get feeds</h1>
        <ListMyFeeds></ListMyFeeds>
        <Link href='/'> Go to Home </Link>
    

        </div>
    ): (
        <div>
                <Navbar></Navbar>

         <p>You are not authenticated </p>
         </div>
    )
  }