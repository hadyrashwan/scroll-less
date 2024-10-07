import { GET } from './route'; // Import the GET handler
import { db } from '@/schema';
import { vi, describe, it, expect, afterEach } from 'vitest';

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
    select: vi.fn(),
  },
  posts: { id: 'posts.id' },
}));

describe('GET /api/posts/[id]', () => {
  afterEach(() => {
    vi.clearAllMocks(); // Clear mocks after each test
  });

  it('should return a post if found', async () => {
    const postId = '1'; // Example post ID
    const mockPost = [{ id: postId, title: 'Test Post', content: 'This is a test post.' }];

    // Mock the database query chain
    (db.select as any).mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockResolvedValueOnce(mockPost),
        }),
      }),
    });

    const req = { method: 'GET' } as any; // Simulate request object
    const params = { id: postId }; // Simulate params

    const response = await GET(req, { params });

    // Validate the mocked NextResponse object for correct behavior
    expect(response.status).toBe(200);
    const jsonResponse = await response.json();
    expect(jsonResponse.success).toBe(true);
    expect(jsonResponse.body.posts).toEqual(mockPost);
  });

  it('should return 500 if a database error occurs', async () => {
    const postId = '1';

    // Simulate a database error
    (db.select as vi.Mock).mockReturnValueOnce({
      from: vi.fn().mockReturnValue({
        where: vi.fn().mockReturnValue({
          limit: vi.fn().mockRejectedValueOnce(new Error('Database error')),
        }),
      }),
    });

    const req = { method: 'GET' } as any;
    const params = { id: postId }; // Simulate params

    const response = await GET(req, { params });

    // Validate the mocked NextResponse object for error response
    expect(response.status).toBe(500);
    const jsonResponse = await response.json();
    expect(jsonResponse.error).toBe('Database error');
  });
});
