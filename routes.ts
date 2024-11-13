/**
 * this file contains all routes
 */
/**
 * this are pubilc routes that don't need authcation
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "api/auth/provider",
    
]
/**
 * this are auth routes that  need authcation
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password"
]
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings"