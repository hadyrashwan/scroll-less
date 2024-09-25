import { db, feeds } from "@/schema";
import { auth } from "@/auth"
import { eq } from 'drizzle-orm';


export default async function handler(req, res) {

    const session = await auth();
    console.log('here')
  if (req.method === "GET") {

    const userId = session?.user?.id || '';

    // no check here if this is really the feedId of the user need to use auth.js

    
    try {
        // Here you would add your database logic (save the URL)
       const response = await  db.select().from(feeds).where(eq(feeds.userId, userId));

      // Simulating a database save
      // Respond with success
      return res.status(200).json({ success: true, body: {feeds: response} });
    } catch (error) {
      return res.status(500).json({ error: "Database error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
