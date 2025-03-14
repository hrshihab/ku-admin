// Comment out or delete the middleware file
// We're not using route protection for now

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Add your middleware logic here
  return NextResponse.next()
}

// Optional: Configure middleware to run on specific paths
export const config = {
  matcher: [
    // Add paths that should be protected by middleware
    // For example:
    // '/dashboard/:path*',
    // '/api/:path*',
  ]
}
