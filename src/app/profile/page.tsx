import { auth } from "@/auth"
import Navbar from "@/components/nav-bar";
import AddFeed from "@/components/add-feed";
import AddPost from "@/components/add-post";
import ListMyFeeds from "@/components/list-my-feeds";
import ProfileInfo from "@/components/profile-info";

export default async function Page() {


    const session = await auth()

    return  session ? (
    <div>
    <Navbar></Navbar>
    <ProfileInfo></ProfileInfo>
    <ListMyFeeds></ListMyFeeds>

        <AddPost></AddPost>
        <AddFeed></AddFeed>
    

        </div>
    ): (
        <div>
                <Navbar></Navbar>

         <p>You are not authenticated </p>
         </div>
    )
  }