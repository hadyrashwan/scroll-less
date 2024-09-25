// /pages/api/save-url.js
import { db, posts } from "@/schema";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { url , feedId , type } = req.body;

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Invalid URL" });
    }


    // no check here if this is really the feedId of the user need to use auth.js

    db.insert(posts).values({  feedId, type:'FACEBOOK', url, type });

    try {
      // Here you would add your database logic (save the URL)
      // For example: await db.save({ url });

      // Simulating a database save
      console.log("Saving URL to DB:", url);

      // Respond with success
      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Database error" });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
