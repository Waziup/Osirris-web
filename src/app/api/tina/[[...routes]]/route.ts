import { TinaNodeBackend, LocalBackendAuthHandler } from "@tinacms/datalayer";
import { NextRequest, NextResponse } from "next/server";

import databaseClient from "../../../../../tina/__generated__/databaseClient";

const handler = TinaNodeBackend({
  authProvider: LocalBackendAuthHandler(),
  databaseClient,
});

export async function GET(req: NextRequest) {
  const response = await handler(req, new NextResponse());
  return response;
}

export async function POST(req: NextRequest) {
  const response = await handler(req, new NextResponse());
  return response;
}
