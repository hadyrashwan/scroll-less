import { db, feeds, posts } from "@/schema";
import { eq , InferSelectModel} from "drizzle-orm";
import { NextResponse } from "next/server.js";
import { Feed as RssFeed } from "feed";

type Post = InferSelectModel<typeof posts>;
type Feed = InferSelectModel<typeof feeds>;




import { logger } from "@/lib/logger";
const log = logger.child({ module: "feeds" });


export const GET =  async function (req:Request, options: { params: {id: string}})  {

  const { params } = options;
  const { id } = params as { id: string};

  

  try {
    // Fetch the feed details
    const feed = await db.select().from(feeds).where(eq(feeds.id, id)).get();

    if (!feed) {
      return NextResponse.json({ message: "Feed not found" }, { status: 404 });
    }

    // Fetch the posts related to the feed
    const posts_found = await db
      .select()
      .from(posts)
      .where(eq(posts.feedId, id));


    const rss = getRssFeed({feed,posts:posts_found, host: req.headers.get('host')  || 'me.xyz' })


    return new NextResponse(rss, {
        headers: {
          'Content-Type': 'application/rss+xml',
        },
      });

  } catch (error) {
    log.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
};

const getRssFeed = (payload:{feed: Feed,posts: Post[], host: string}):string => {

        const { feed , posts, host} = payload
        // Create a new Feed instance
        const rssFeed = new RssFeed({
            title: feed.name,
            description: feed.description,
            id: feed.id,
            link: `${host}/feeds/${feed.id}`,
            copyright: 'All rights reserved',
          });
      
          // Add posts to the feed
          for (const post of posts) {
            rssFeed.addItem({
              title: post.id,
              id: post.id,
              link: `${host}/posts/${post.id}`,
              date: new Date(post.created_at as number),
              description: 'this is a test post',
              content: `This is the content of 
              scroll less link: https://${host}/posts/${post.id}
              original link: ${post.url},  `
            });
          }

         return rssFeed.rss2()
}