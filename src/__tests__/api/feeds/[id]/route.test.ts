/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET } from '@/app/api/feeds/[id]/route'; // Import the GET handler
import { db } from '@/schema';
import { vi, describe, it, expect } from 'vitest';

// Mock the database functions
vi.mock("@/schema", () => ({
  db: {
    select: vi.fn(),
  },
  feeds: {
    id: 'id',
  },
  posts: {
    feedId: 'feedId',
  },
}));

describe("GET /api/feeds/:id", () => {
  const req = {} as Request;

  it("should return feed and posts when feed exists", async () => {
    const feedId = "1";
    const mockFeed = { id: feedId, name: "Test Feed" };
    const mockPosts = [{ id: "1", feedId, content: "Test Post" }];

    // Mock the database response
    (db.select  as any).mockReturnValueOnce({
      from: vi.fn().mockReturnValueOnce({
        where: vi.fn().mockReturnValueOnce({
          get: vi.fn().mockResolvedValueOnce(mockFeed),
        }),
      }),
    });

    (db.select  as any).mockReturnValueOnce({
      from: vi.fn().mockReturnValueOnce({
        where: vi.fn().mockReturnValueOnce(mockPosts),
      }),
    });

    const response = await GET(req, { params: { id: feedId } });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toEqual({
      success: true,
      body: { feed: mockFeed, posts: mockPosts },
    });
  });

  it("should return 404 when feed is not found", async () => {
    const feedId = "2";

    (db.select  as any).mockReturnValueOnce({
      from: vi.fn().mockReturnValueOnce({
        where: vi.fn().mockReturnValueOnce({
          get: vi.fn().mockResolvedValueOnce(null),
        }),
      }),
    });

    const response = await GET(req, { params: { id: feedId } });

    expect(response.status).toBe(404);
    const data = await response.json();
    expect(data).toEqual({ message: "Feed not found" });
  });

  it("should return 500 when there is a database error", async () => {
    const feedId = "3";

    (db.select  as any).mockImplementationOnce(() => {
      throw new Error("Database error");
    });

    const response = await GET(req, { params: { id: feedId } });

    expect(response.status).toBe(500);
    const data = await response.json();
    expect(data).toEqual({ error: "Database error" });
  });
});