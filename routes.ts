/**
 * this file contains all routes
 */
/**
 * this are pubilc routes that don't need authcation
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
]
/**
 * this are auth routes that  need authcation
 * @type {string[]}
 */

export const authRoutes = [
    "/auth/login",
    "/auth/register",
]
export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/settings"