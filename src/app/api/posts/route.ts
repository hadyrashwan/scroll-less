import { auth } from "@/auth";
import { db, feeds, posts } from "@/schema";
import { eq, and } from "drizzle-orm";
import { NextResponse } from "next/server";

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
    console.log(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
});

export const POST = auth(async function GET(req) {
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

    const values = { id: crypto.randomUUID(), feedId, url, type };

    await db.insert(posts).values(values);


    
    return NextResponse.json({ success: true, body: { posts: [values] } });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
});
