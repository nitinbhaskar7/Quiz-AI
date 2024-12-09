import { NextResponse,NextRequest } from 'next/server'
// import { getServerSession } from 'next-auth'
import { getToken } from 'next-auth/jwt'
import { authOptions } from './app/api/auth/[...nextauth]/route'
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {

    const token = await getToken({req : request})
  const protectedRoutes = ['/profile' , '/quiz' , '/dashboard'] 
  const publicRoutes = ['/login']
    if(protectedRoutes.includes(request.nextUrl.pathname) && !token){
        return NextResponse.redirect(new URL('/login' , request.url).toString())
    }
    if(publicRoutes.includes(request.nextUrl.pathname) && token){
        return NextResponse.redirect(new URL('/profile' , request.url).toString())
    }
    return NextResponse.next()
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/login' , '/profile' , '/quiz' , '/dashboard'] ,
}