import { auth } from "@/auth";
import { db, posts } from "@/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const GET = auth(async function GET(req, { params }) {

  const { id } = params as { id: string};

  try {

    // Fetch the posts related to the feed
    const posts_found = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id)).limit(1);

    return NextResponse.json({
      success: true,
      body: { posts: posts_found },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
});
