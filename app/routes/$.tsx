import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "New App | Remix" },
    { name: "author", content: "Alex Stevens" },
    { name: "description", content: "Boilerplate for Remix Application" },
  ];
};

export default function HomePage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            404 Page
          </h1>

        </header>

      </div>
    </div>
  );
}
