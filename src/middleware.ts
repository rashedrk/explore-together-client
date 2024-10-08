import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Role = keyof typeof roleBasedPrivateRoutes;

const AuthRoutes = ['/login', '/register'];
const commonPrivateRoutes = ['/dashboard', '/dashboard/change-password', '/post_trip', '/travel_request', '/profile'];
const roleBasedPrivateRoutes = {
   ADMIN: [/^\/dashboard\/admin\/?.*/],
};

export function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;

   const accessToken = cookies().get('accessToken')?.value;

   if (!accessToken) {
      if (AuthRoutes.includes(pathname)) {
         return NextResponse.next();
      } else {
         return NextResponse.redirect(new URL('/login', request.url));
      }
   }

   if (accessToken && commonPrivateRoutes.includes(pathname)) {
      return NextResponse.next();
   }

   let decodedData = null;

   if (accessToken) {
      decodedData = jwtDecode(accessToken) as any;
   }

   const role = decodedData?.role;


   if (role && roleBasedPrivateRoutes[role as Role]) {
      const routes = roleBasedPrivateRoutes[role as Role];
      console.log(`Role-based routes for role ${role}: ${routes}`);
      if (routes.some((route) => pathname.match(route))) {
         return NextResponse.next();
      }
   }

   return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
   matcher: ['/login', '/register', '/dashboard/:page*'],
};