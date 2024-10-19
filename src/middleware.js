import { NextResponse } from 'next/server';
 
export function middleware(request) {

  if(request.cookies.get('token')?.value) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url))
}
 
export const config = {
  matcher: '/u/:path*',
}