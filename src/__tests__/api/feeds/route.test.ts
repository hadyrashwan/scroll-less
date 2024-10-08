/* eslint-disable @typescript-eslint/no-explicit-any */
import { db, feeds } from "@/schema";
import { GET, POST } from "@/app/api/feeds/route"; // Update with your actual route path
import { vi, describe, it, expect } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/auth", () => ({
  auth: (handler:any) => async (req:any, isAuthenticated = true) => {
    req.auth = { user: { id: "testUserId" } }; // Mock authenticated user
    if(!isAuthenticated){
        delete req.auth;
    }
    return handler(req);
  },
}));

vi.mock("@/schema", () => ({
  db: {
    select: vi.fn(),
    insert: vi.fn(),
  },
  feeds: {
    userId: 'userId',
    id: 'id',
    name: 'name',
    description: 'description',
  },
}));

vi.mock("crypto", () => ({
  randomUUID: () => "mocked-uuid",
}));

const mockOptions = {
  params: {
    id: "123" // Example ID
  }
};

describe("API Feeds Endpoints", () => {
  const mockReqGet = {} as NextRequest;

  const mockReqPost = {
    json: vi.fn().mockResolvedValue({ name: "Test Feed", description: "A test feed description" }),
  } as unknown as NextRequest;

  describe("GET /api/feeds", () => {
    it("should return feeds if authenticated", async () => {
      const mockFeeds = [{ id: "1", userId: "testUserId", name: "Test Feed", description: "A test feed" }];

      (db.select as any).mockReturnValueOnce({
        from: vi.fn().mockReturnValueOnce({
          where: vi.fn().mockReturnValueOnce(mockFeeds),
        }),
      });

      const response = (await GET(mockReqGet, mockOptions)) as Response;

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual({ success: true, body: { feeds: mockFeeds } });
    });


    it("should return 500 for database errors", async () => {

      (db.select as any).mockImplementationOnce(() => {
        throw new Error("Database error");
      });

      const response = (await GET(mockReqGet, mockOptions)) as Response;

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toEqual({ error: "Database error" });
    });
  });

  describe("POST /api/feeds", () => {
    it("should return success and insert feed if authenticated", async () => {
      const expectedValues = { id: "mocked-uuid", userId: "testUserId", name: "Test Feed", description: "A test feed description" };

      // Mock database insert
      (db.insert as any).mockReturnValueOnce({
        values: vi.fn().mockResolvedValueOnce(expectedValues),
      });

      const response: Response = (await POST(mockReqPost, mockOptions)) as Response;

      expect(response.status).toBe(200);
      const data = await response.json();
      expect(data).toEqual({ success: true, body: { feeds: [expectedValues] } });
      expect(db.insert).toHaveBeenCalledWith(feeds); // Check insert called with feeds
    });


    it("should return 500 for database errors", async () => {
      mockReqPost.json = vi.fn().mockResolvedValue({ name: "Test Feed", description: "A test feed description" });

      (db.insert as any).mockImplementationOnce(() => {
        throw new Error("Database error");
      });

      const response = (await POST(mockReqPost, mockOptions)) as Response;

      expect(response.status).toBe(500);
      const data = await response.json();
      expect(data).toEqual({ error: "Database error" });
    });
  });
});