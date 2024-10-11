import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Dashboard" },
  ];
};

export function loader({ request, params }: LoaderFunctionArgs){
  const boardId = params.boardId
  return json({ boardId })
}

export default function Dashboard() {
  const { boardId } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Dashboard Screen
          </h1>
          <p>Board Id: {" "} {boardId}</p>
        </header>

      </div>
    </div>
  );
}
