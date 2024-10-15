import { auth } from "@/auth";
import { db, feeds, posts } from "@/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server.js";
import ogs from 'open-graph-scraper';


// import { logger } from "@/lib/logger";
// const log = logger.child({ module: "posts" });

export const GET = auth(async function GET(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  // get path param
  const feedId = req.nextUrl.searchParams.get("feedId") || "";

  try {
    // Here you would add your database logic (save the URL)
    const response = await db
      .select()
      .from(posts)
      .where(eq(posts.feedId, feedId));

    return NextResponse.json({ success: true, body: { feeds: response } });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
});

export const POST = auth(async function POST(req) {
  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const { feedId, url, type } = await req.json();

  const userId = req.auth?.user?.id || "";

  try {
    const feedsFound = await db
      .select()
      .from(feeds)
      .where(and(eq(feeds.id, feedId), eq(feeds.userId, userId)));
    if (feedsFound.length === 0) {
      return NextResponse.json(
        { error: "Feed not found under this user" },
        { status: 404 }
      );
    }

    const options = {
      url,
      timeout: 5000, // Optional: set a timeout for the request
      followRedirect: true, // Optional: follow redirects
    };

    const { error, response, result } = await ogs(options);

    if (error) {
      throw new Error(`Failed to fetch metadata ${response}`);
    }


    const values = {
      id: crypto.randomUUID(),
      feedId,
      url,
      type,
      title: result.ogTitle || "",
      description: result.ogDescription || "",
      image: result.ogImage?.length ? result.ogImage[0].url : "",
    };

    await db.insert(posts).values(values);

    return NextResponse.json({ success: true, body: { posts: [values] } });
  } catch (error) {
    log.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
});
