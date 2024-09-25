import { SignOut } from "@/components/sign-out";
import { auth } from "@/auth"
import Link from "next/link";
import Navbar from "@/components/nav-bar";
import TelegramWidget from "@/components/telegram-widget"; // Import the new component
import VideoPlayer from "@/components/video-player";
import InstagramEmbed from "@/components/instgram-widget";
import TwitterEmbed from "@/components/twitter-widget";
import FacebookEmbed from "@/components/facebook-widget";
import TiktokWidget from "@/components/tiktok-widget";
import RedditEmbed from "@/components/redit-widget";


export default async function Page() {


    const session = await auth()

    return  session ? (
    <div>
    <Navbar></Navbar>
    <InstagramEmbed url="https://www.instagram.com/reel/DARAqWhuShV"></InstagramEmbed> 
    <InstagramEmbed url="    https://www.instagram.com/p/CxbGKP2s7sL/?img_index=1"></InstagramEmbed>
    <InstagramEmbed url="https://www.instagram.com/reel/DADNu17KzuG/?utm_source=ig_web_copy_link"></InstagramEmbed>
    <TelegramWidget url="https://t.me/QudsN/469613" />
    <TwitterEmbed url="https://x.com/david_perell/status/1838425252772077636" />
    <VideoPlayer url="https://pub-ceb0ddba66bc4400b6246432ba4a0947.r2.dev/video-uploads/Rick%20Astley%20-%20Never%20Gonna%20Give%20You%20Up%20(Official%20Music%20Video).mp4" ></VideoPlayer>
    <VideoPlayer url="https://www.youtube.com/watch?v=sUsD9lt1upg" ></VideoPlayer>

    <FacebookEmbed url="https://www.facebook.com/watch?v=447535404967828"></FacebookEmbed>
    <TiktokWidget url="https://www.tiktok.com/@pandaboi.com/video/7414188994755448096"></TiktokWidget>
    <RedditEmbed url="https://www.reddit.com/r/linux/comments/1fn835r/is_this_a_relevant_book_for_a_beginner"></RedditEmbed>
    <h1>Hello,  My profile</h1>
    <h2> {session?.user?.id }  </h2>
    <h2> {session?.user?.email }  </h2>
    <pre>{JSON.stringify(session)}</pre>
        <SignOut></SignOut>
        <Link href='/'> Go to Home </Link>
    

        </div>
    ): (
        <div>
                <Navbar></Navbar>

         <p>You are not authenticated </p>
         </div>
    )
  }