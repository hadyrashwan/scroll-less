/* eslint-disable @typescript-eslint/no-explicit-any */
import { GET, POST } from "@/app/api/feeds/route"; // Update with your actual route path
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

describe("API Feeds Endpoints 401 scenario", () => {

  describe("GET /api/feeds", () => {

    it("should return 401 if not authenticated", async () => {
      const unauthenticatedReq = {} as NextRequest;

      const response = (await GET(unauthenticatedReq, mockOptions) as Response) ;

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data).toEqual({ message: "Not authenticated" });
    });

  });

  describe("POST /api/feeds", () => {

    it("should return 401 if not authenticated", async () => {
      const unauthenticatedReq = {
        json: vi.fn(),
      } as unknown as NextRequest;

      const response = (await POST(unauthenticatedReq, mockOptions) as Response) ;

      expect(response.status).toBe(401);
      const data = await response.json();
      expect(data).toEqual({ message: "Not authenticated" });
    });
  });
});