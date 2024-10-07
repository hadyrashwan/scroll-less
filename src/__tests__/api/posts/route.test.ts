/* eslint-disable @typescript-eslint/no-explicit-any */
import { db, feeds, posts } from "@/schema";
import { GET, POST } from "@/app/api/posts/route"; // Update with your actual route path
import { vi, describe, it, expect } from "vitest";

vi.mock("@/auth", () => ({
  auth: (handler) => async (req) => {
    req.auth = { user: { id: "testUserId" } }; // Mock authenticated user
    return handler(req);
  },
}));

vi.mock("@/schema", () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
  },
  feeds: {
    id: 'id',
    userId: 'userId',
  },
  posts: {
    feedId: 'feedId',
  },
}));

describe("API Endpoints", () => {
  const mockReqGet = {
    nextUrl: { searchParams: new URLSearchParams({ feedId: "1" }) },
  } as Request;

  const mockReqPost = {
    json: vi.fn().mockResolvedValue({ feedId: "1", url: "http://example.com", type: "article" }),
  } as Request;

  describe("GET /api/your-route", () => {
    it("should return posts if authenticated", async () => {
      const mockPosts = [{ id: "1", feedId: "1", content: "Test Post" }];

      db.select.mockReturnValueOnce({
        from: vi.fn().mockReturnValueOnce({
          where: vi.fn().mockReturnValueOnce(mockPosts),
        }),
      });

      const response = await GET(mockReqGet);

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual({ success: true, body: { feeds: mockPosts } });
    });

    // it("should return 401 if not authenticated", async () => {
    //   const unauthenticatedReq = {
    //     nextUrl: { searchParams: new URLSearchParams({ feedId: "1" }) },
    //     auth: null,
    //   } as Request;

    //   const response = await GET(unauthenticatedReq);

    //   expect(response.status).toBe(401);
    //   const data = await response.json();
    //   expect(data).toEqual({ message: "Not authenticated" });
    // });
  });

  describe("POST /api/your-route", () => {
    it("should return success and insert post if authenticated", async () => {
      const mockFeed = [{ id: "1", userId: "testUserId" }];

      // Mock database response for feed check
      db.select.mockReturnValueOnce({
        from: vi.fn().mockReturnValueOnce({
          where: vi.fn().mockReturnValueOnce(mockFeed),
        }),
      });

      const expectedValues = { id: expect.any(String), feedId: "1", url: "http://example.com", type: "article" };

      // Mock database insert
      db.insert.mockReturnValueOnce({
        values: vi.fn().mockResolvedValueOnce(undefined),
      });

      const response = await POST(mockReqPost);

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual({ success: true, body: { posts: [expectedValues] } });
      expect(db.insert).toHaveBeenCalledWith(posts); // Check insert called with posts
    });

    // it("should return 401 if not authenticated", async () => {

    //     vi.mock("@/auth", () => ({
    //         auth: (handler) => async (req) => {
    //           return handler(req);
    //         },
    //       }));

    //   const unauthenticatedReq = {
    //     nextUrl: { searchParams: new URLSearchParams({ feedId: "1" }) },
    //     json: vi.fn(),
    //     auth: undefined,
    //   } as Request;

    //   const response = await POST(unauthenticatedReq);

    //   expect(response.status).toBe(401);
    //   const data = await response.json();
    //   expect(data).toEqual({ message: "Not authenticated" });
    // });

    it("should return 404 if feed not found", async () => {
      const mockFeedId = "2"; // Non-existent feed ID
      mockReqPost.json = vi.fn().mockResolvedValue({ feedId: mockFeedId, url: "http://example.com", type: "article" });

      db.select.mockReturnValueOnce({
        from: vi.fn().mockReturnValueOnce({
          where: vi.fn().mockReturnValueOnce([]), // No feed found
        }),
      });

      const response = await POST(mockReqPost);

      expect(response.status).toBe(404);
      const data = await response.json();
      expect(data).toEqual({ error: "Feed not found under this user" });
    });

    it("should return 500 for database errors", async () => {
      mockReqPost.json = vi.fn().mockResolvedValue({ feedId: "1", url: "http://example.com", type: "article" });

      db.select.mockImplementationOnce(() => {
        throw new Error("Database error");
      });

      const response = await POST(mockReqPost);

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toEqual({ error: "Database error" });
    });
  });
});
