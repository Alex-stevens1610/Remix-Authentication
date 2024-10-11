import type { MetaFunction, ActionFunctionArgs } from "@remix-run/node";
import { Form, Link, redirect, useActionData } from "@remix-run/react";
import { Label, Input } from "~/components/input";
import { Button } from "~/components/button";

import { validate } from "./validate";
import { createAccount } from "./queries";
import { authCookie } from "~/utilities/auth";

export const meta: MetaFunction = () => {
  return [{ title: "Dashboard" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  let email = String(formData.get("email"));
  let password = String(formData.get("password"));

  let errors = await validate(email, password);

  if (errors) {
    return { errors };
  }

  let user = await createAccount(email, password);

  return redirect("/", {
    headers: {
      "Set-Cookie": await authCookie.serialize(user.id),
    },
  });
}

export default function Register() {
  let actionData = useActionData<typeof action>();
  let emailErr = actionData?.errors?.email;
  let passwordErr = actionData?.errors?.password;

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Register Screen
          </h1>
        </header>

        <div className="p-16 bg-neutral-800 rounded-lg">
          <Form method="POST" className="space-y-12">
            <div>
              <Label htmlFor="email">
                Email{" "}
                {emailErr && <span className="text-red-700">{emailErr}</span>}
              </Label>
              <Input type="email" name="email" required />
            </div>
            <div>
              <Label htmlFor="password">
                Password{" "}
                {passwordErr && (
                  <span className="text-red-700">{passwordErr}</span>
                )}
              </Label>
              <Input type="password" name="password" required />
            </div>
            <div>
              <Button type="submit" className="bg-neutral-200">
                Submit
              </Button>
            </div>

            <div>
              <p>
                Already have an account?{" "}
                <Link to={"/login"} className="underline">
                  Log In.
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
