import { auth } from "@/auth"
import { db, feeds } from "@/schema";
import { eq } from 'drizzle-orm';
import { NextResponse } from "next/server"
 
export const GET = auth( async function GET(req) {

  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })

    const userId = req.auth?.user?.id || '';


    
    try {
        // Here you would add your database logic (save the URL)
       const response = await  db.select().from(feeds).where(eq(feeds.userId, userId));

      return NextResponse.json({ success: true, body: {feeds: response} });
    } catch (error) {
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

})

export const POST = auth( async function GET(req) {

  if (!req.auth)
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 })


  const { name , description } =  await req.json();

    const userId = req.auth?.user?.id || '';

    
    try {
       const response = await  db.insert(feeds).values({  id: crypto.randomUUID() ,userId, name, description});

      return NextResponse.json({ success: true, body: {feeds: [response]} });
    } catch (error) {
      console.log(error);
      return NextResponse.json({ error: "Database error" }, { status: 500 });
    }

})