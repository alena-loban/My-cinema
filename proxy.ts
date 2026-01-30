import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { authConfig } from './configs/auth';

export async function proxy(request: NextRequest) {
  const session = await getServerSession(authConfig);
  if (!session?.user) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  }
}

export const config = {
  matcher: ['/profile', '/admin'],
};
