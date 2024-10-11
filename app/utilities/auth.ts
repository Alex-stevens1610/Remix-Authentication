
import { createCookie } from "@remix-run/node";


let secret = process.env.C_SECRET || "default";
if (secret === "default"){
    console.warn("Cookie Secret: C_SECRET not set in .env, the app is insecure.")
    secret = "default-secret"
}

export let authCookie  = createCookie("auth", {
    httpOnly: true,
    path: "/",
    sameSite: 'lax',
    secrets: [secret],
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 1 Day
})

