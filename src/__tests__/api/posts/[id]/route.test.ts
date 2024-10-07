import { GET } from '@/app/api/posts/[id]/route'; // Import the GET handler
import { db } from '@/schema';
import { vi, describe, it, expect, afterEach } from 'vitest';
import { NextResponse } from 'next/server'; // Import the NextResponse type

// Mock the Next.js NextResponse object
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn().mockImplementation((data, init) => ({
      status: init?.status || 200,
      json: () => Promise.resolve(data),
    })),
  },
}));

// Mock the database schema
vi.mock('@/schema', () => ({
  db: {
    select: vi.fn(), // Mock db.select directly
  },
  posts: { id: 'posts.id' },
}));

// Define types for the request and response
type MockRequest = {
  method: string;
};

type MockResponse = {
  status: number;
  json: () => Promise<any>;
};

// Define a mock type for the query builder
type QueryBuilder = {
  from: (table: string) => {
    where: (condition: any) => {
      limit: (limit: number) => Promise<any[]>;
    };
  };
};

describe('GET /api/posts/[id]', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test
  });

  it('should return a post if found', async () => {
    const postId = '1'; // Example post ID
    const mockPost = [{ id: postId, title: 'Test Post', content: 'This is a test post.' }];

    // Mock the database query chain
    (db.select as typeof vi.fn).mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValueOnce(mockPost),
        }),
      }),
    } as QueryBuilder); // Cast the return type to QueryBuilder

    const req: MockRequest = { method: 'GET' }; // Simulate request object
    const params = { id: postId }; // Simulate params

    const response: MockResponse = await GET(req, { params });

    // Validate the mocked NextResponse object for correct behavior
    expect(response.status).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse.success).toBe(true);
    expect(jsonResponse.body.posts).toEqual(mockPost);
  });

  it('should return 500 if a database error occurs', async () => {
    const postId = '1';

    // Simulate a database error
    (db.select as typeof vi.fn).mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockRejectedValueOnce(new Error('Database error')),
        }),
      }),
    } as QueryBuilder); // Cast the return type to QueryBuilder

    const req: MockRequest = { method: 'GET' }; // Simulate request object
    const params = { id: postId }; // Simulate params

    const response: MockResponse = await GET(req, { params });

    // Validate the mocked NextResponse object for error response
    expect(response.status).toBe(500);
    const jsonResponse = await response.json();
    expect(jsonResponse.error).toBe('Database error');
  });
});
