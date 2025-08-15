import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url');
  const ref = req.nextUrl.searchParams.get('ref');
  if (!url || typeof url !== 'string') {
    return new NextResponse('Missing url', { status: 400 });
  }
  const response = await fetch(url, {
    headers: {
      Referer: ref || "",
    }
  });
  if (!response.ok) {
    return new NextResponse(null, { status: response.status });
  }
  const body = await response.arrayBuffer();

  // Set CORS headers so the browser can access the stream
  return new NextResponse(body, {
    status: response.status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': response.headers.get('Content-Type') || 'application/octet-stream',
    },
  });
}