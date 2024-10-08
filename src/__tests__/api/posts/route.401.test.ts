/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET, POST } from "@/app/api/posts/route"; // Update with your actual route path
import { vi, describe, it, expect } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/auth", () => ({
  auth: (handler:any) => async (req:any) => {
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

const mockOptions = {
    params: {
      id: "123" // Example ID
    }
  };
  

describe("API Endpoints", () => {

  describe("GET /api/posts 401", () => {

    it("should return 401 if not authenticated", async () => {
      const unauthenticatedReq = {
        nextUrl: { searchParams: new URLSearchParams({ feedId: "1" }) },
        auth: null,
      } as unknown as NextRequest;

      const response = (await GET(unauthenticatedReq, mockOptions) ) as Response;

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data).toEqual({ message: "Not authenticated" });
    });
  });

  describe("POST /api/posts 401", () => {


    it("should return 401 if not authenticated", async () => {

      const unauthenticatedReq = {
        nextUrl: { searchParams: new URLSearchParams({ feedId: "1" }) },
        json: vi.fn(),
        auth: undefined,
      } as unknown as NextRequest;

      const response =  ( await POST(unauthenticatedReq, mockOptions) as Response );

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data).toEqual({ message: "Not authenticated" });
    });

  });
});
