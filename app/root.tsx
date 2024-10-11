import {
  Link,

  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";

import "./tailwind.css";
import { authCookie } from "./utilities/auth";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export async function loader({ request, }: LoaderFunctionArgs){
  let cookieString = request.headers.get('Cookie');
  let userId = await authCookie.parse(cookieString)
  return { userId }
 
}

export function Layout({ children }: { children: React.ReactNode }) {

  let { userId } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div>
            <nav className="h-16 w-full bg-neutral-800 fixed top-0">
                <div className="h-full flex justify-around items-center">
                    <div>
                        <Link to={"/"}>Home</Link>
                    </div>
                    <div>
                        <Link to={"/dashboard"}>Dashboard</Link>
                    </div>
                    <div>
                      {
                        userId ?
                          (
                            <form method="post" action="/logout">
                              <button className="block text-center">
                                <span>Log Out</span>
                              </button>
                            </form>
                          ) : (
                            <Link to={"/login"}>Login/Register</Link>
                          )
                      }
                    </div>
                </div>
            </nav>
            <main className="mt-16">
                {children}
            </main>
        </div>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  } else if (error instanceof Error){
    return (
      <>
        <h1>Error!</h1>
        <p>{error?.message}</p>
      </>
    );
  } else {
    return (
      <h1>Unknown Error!</h1>
    )
  }

}