import { auth } from "@/auth";
import { db, feeds, posts } from "@/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server.js";
import ogs from 'open-graph-scraper';
import { OgObject } from "open-graph-scraper/types";

const OG_RETRY = 5

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

     const result = await fetchOGData(url,OG_RETRY)

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
    console.error(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
});

async function fetchOGData(url: string, maxRetries: number = 10): Promise<OgObject> {
  let attempt = 0;

  while (attempt < maxRetries) {
    let result: OgObject = {};
    try {
      const options = {
        url,
        timeout: 1000,
        followRedirect: true,
      };

      const { error, response, result: ogResult } = await ogs(options);

      if (error) {
        throw new Error(`Failed to fetch metadata ${response}`);
      }

      result = ogResult;

      if (ogResult.ogImage?.length) {
        return ogResult;
      }else{
        console.log(`attempt ${attempt}, ${JSON.stringify(ogResult)}  `)
      }
    } catch (err) {
      console.error(`Error on attempt ${attempt + 1}: ${err}`);
    }

    attempt++;

    if (attempt < maxRetries) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second before retrying
    } else {
      return result
    }
  }

  return {}; // Ensure a return statement in case the loop exits unexpectedly
}
