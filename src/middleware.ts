import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { decrypt } from './lib/session';

const protectedRoutes = ['/dashboard'];
// const publicRoutes = ['/'];
const authRoute = ['/login', '/register'];

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.includes(path);
  // const isPublic = publicRoutes.includes(path);
  const isAuthRoutes = authRoute.includes(path);

  const cookiesStore = await cookies();

  const cookie = cookiesStore.get('session')?.value;

  const session = await decrypt(cookie);

  if (isProtected && !session?.userId) {
    return NextResponse.redirect(new URL('/', req.nextUrl));
  }

  if (isAuthRoutes && session?.userId) {
    return NextResponse.redirect(new URL('/dashboard', req.nextUrl));
  }

  return NextResponse.next();
}
