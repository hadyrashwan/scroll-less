import { auth } from "@/auth"
import { db, feeds, posts, users } from "@/schema";
import { eq } from 'drizzle-orm';
import { NextResponse } from "next/server"
 
export const GET = auth( async function GET(req) {

  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

    const userId = req.auth?.user?.id || '';

    // get path param
    const feedId = req.nextUrl.searchParams.get('feedId') || '';


    
    try {
        // Here you would add your database logic (save the URL)
       const response = await  db.select().from(posts).where(eq(posts.feedId, feedId));

      return NextResponse.json({ success: true, body: {feeds: response} });
    } catch (error) {
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

})

export const POST = auth( async function GET(req) {

  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })


  const { feedId, name , description } =  await req.json();

    const userId = req.auth?.user?.id || '';

    
    try {
        const feedsFound =  await db.select().from(feeds).where(eq(feeds.id, feedId).append(eq(feeds.userId, userId)));
        if (feedsFound.length === 0) {
          return NextResponse.json({ error: "Feed not found under this user" }, { status: 404 });
        }
       const response = await  db.insert(feeds).values({  id: crypto.randomUUID() ,userId, name, description});

      return NextResponse.json({ success: true, body: {feeds: [response]} });
    } catch (error) {
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

})