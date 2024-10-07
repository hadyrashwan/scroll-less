import { auth } from "@/auth";
import { db, feeds, posts } from "@/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server.js";

export const GET = auth(async function GET(req, { params }) {
  if (!req.auth) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

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

    return NextResponse.json({
      success: true,
      body: { feed, posts: posts_found },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
});
