import authConfig from "./auth.config"
import NextAuth from "next-auth"
import{
  publicRoutes,
  authRoutes,
  apiAuthPrefix,
  DEFAULT_LOGIN_REDIRECT
} from "./routes"


const { auth } = NextAuth(authConfig)


export default auth((req)=>{
  const {nextUrl}=req;
  const isLoggedIn = !!req.auth

  const isApiRoutes=nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if(isApiRoutes){
    return null
  }
  if(isAuthRoute){
    if(isLoggedIn){
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT,nextUrl))
    }
    return null
  }
  if(!isLoggedIn && !isPublicRoute){
    return Response.redirect(new URL("/auth/login",nextUrl))   
  }
  
  
  return null

  
})

export const config = {
    matcher: [
      '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
      
      '/(api|trpc)(.*)',
    ],
  }