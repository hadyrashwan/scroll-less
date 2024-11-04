/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET } from "@/app/api/feeds/[id]/rss/route";
import { db } from "@/schema"; // Import as namespace
import { vi, describe, it, expect } from 'vitest';

// Mock the database schema
vi.mock('@/schema', () => ({
  db: {
    select: vi.fn(), // Mock db.select directly
  },
  feeds: { id: 'id' },
  posts: { feedId: 'feedId' },
}));

describe('GET /api/feeds/[id]/rss', () => {
  const host = "me.xyz"
  const headers = new Headers({
         host,
       })
  const req = {headers} as Request;

  it('should return RSS feed when feed is found', async () => {
    const feedId = "1";
    const postUrl = "https:example.com"
    const mockFeed = { id: feedId, name: "Test Feed" };
    const mockPosts = [{ id: "1", feedId, content: "Test Post" , url:postUrl }];

    // Mock the select chain for fetching the feed
    (db.select as any).mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValueOnce(mockFeed),
        }),
      }),
    });

    // Mock the select chain for fetching posts
    (db.select as any).mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue(mockPosts),
      }),
    });


    const response = await GET(req, { params: { id: feedId  } });

    expect(response.status).toBe(200);
    expect(response.headers.get('Content-Type')).toBe('application/rss+xml');

    // Check key elements of the RSS content
    const content = await response.text();
    expect(content).toContain("<title>Test Feed</title>");
    expect(content).toContain(`<link>${host}/feeds/${feedId}</link>`);
  });

  it('should return 404 when feed is not found', async () => {
    // Mock the select chain to return null for the feed not found case
    (db.select as any).mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          get: vi.fn().mockResolvedValueOnce(null),
        }),
      }),
    });

    const response = await GET(req, { params: { id: 'nonexistent-id' } });

    expect(response.status).toBe(404);
  });
});
