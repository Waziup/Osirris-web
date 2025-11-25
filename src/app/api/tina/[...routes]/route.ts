import { NextRequest, NextResponse } from "next/server";

// This is a placeholder API route for TinaCMS
// For local development, TinaCMS CLI will handle the GraphQL API
// This route can be used for custom API logic if needed

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: "TinaCMS API - use tinacms dev command" });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({ message: "TinaCMS API - use tinacms dev command" });
}
