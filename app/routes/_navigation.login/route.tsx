import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { Button } from "~/components/button";
import { Label, Input } from "~/components/input";

import { validate } from "./validate";

export const meta: MetaFunction = () => {
  return [
    { title: "Login" },
  ];
};

export async function action({ request }: ActionFunctionArgs){
    const formData = await request.formData();
    console.log('Database errors')
    return null
}

export default function Login() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Login Screen
          </h1>
        </header>

        <div className="p-16 bg-neutral-800 rounded-lg">
            <Form method="POST" className="space-y-12">
                <div>
                    <Label htmlFor="email">
                      Email
                    </Label>
                    <Input type="email" name="email"/>
                </div>
                <div>
                     <Label htmlFor="password">
                      Password
                    </Label>
                    <Input type="password" name="password"/>
                </div>
                <div>
                  <Button type="submit" className="bg-neutral-200">
                    Submit
                  </Button>
                </div>

                <div>
                  <p>Don't have an account? <Link to={"/register"} className="underline">Sign Up.</Link></p>
                </div>
            </Form>
        </div>
      </div>
    </div>
  );
}
