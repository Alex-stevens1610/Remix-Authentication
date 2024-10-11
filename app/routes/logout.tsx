import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { authCookie } from "~/utilities/auth";

export async function action({ request }: ActionFunctionArgs){
    // Clear cookies
    return redirect("/login", {
        headers: {
            "Set-Cookie": await authCookie.serialize("", {
                maxAge: 0,
            })
        }
    } )
}
