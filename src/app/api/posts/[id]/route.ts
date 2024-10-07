import { db, posts } from "@/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server.js";

export const GET = async function GET(_: { method: string; }, options: { params: {id: string}}): Promise<Response> {


  const { params } = options;
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
};
