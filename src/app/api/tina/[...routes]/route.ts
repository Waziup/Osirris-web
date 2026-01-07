import { NextRequest, NextResponse } from "next/server";

/**
 * Tina CMS API Route
 * 
 * This route is DISABLED in production for security.
 * Tina CMS only runs locally during development.
 * 
 * Production behavior:
 * - Returns 403 Forbidden
 * - Tina CMS admin interface is not accessible
 * - Content is managed locally and deployed via git
 * 
 * Development behavior:
 * - TinaCMS CLI handles the GraphQL API
 * - Access at http://localhost:3000/admin
 */

export async function GET(req: NextRequest) {
  // Disable Tina CMS on production
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Tina CMS is disabled on production" },
      { status: 403 }
    );
  }

  return NextResponse.json({ message: "TinaCMS API - use tinacms dev command" });
}

export async function POST(req: NextRequest) {
  // Disable Tina CMS on production
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Tina CMS is disabled on production" },
      { status: 403 }
    );
  }

  return NextResponse.json({ message: "TinaCMS API - use tinacms dev command" });
}
