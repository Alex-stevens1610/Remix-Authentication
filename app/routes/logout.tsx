import { ActionFunctionArgs, redirect } from "@remix-run/node";


export async function action({ request }: ActionFunctionArgs){
    // Clear cookies

    return redirect("/login", )
}


export function logout({}){

}