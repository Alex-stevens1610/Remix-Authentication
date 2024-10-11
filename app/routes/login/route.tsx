import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useActionData } from "@remix-run/react";
import { Button } from "~/components/button";
import { Label, Input } from "~/components/input";
import { json, redirect } from "@remix-run/node";

import { validate } from "./validate";
import { matchLoginDetails } from "./queries";
import { authCookie } from "~/utilities/auth";

import { useEffect, useState } from "react";

export const meta: MetaFunction = () => {
  return [{ title: "Login" }];
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  let email = String(formData.get("email"));
  let password = String(formData.get("password"));

  let errors = validate(email, password);
  if (errors) {
    return json({ errors }, 400);
  }

  let userId = await matchLoginDetails(email, password);
  if (!userId) {
    return json(
      {
        errors: {
          email: "Invalid Email or Password",
          password: "Invalid Email or Password",
        },
      },
      400
    );
  }

  return redirect("/", {
    headers: {
      "Set-Cookie": await authCookie.serialize(userId),
    },
  });
}

export default function Login() {
  let actionData = useActionData<typeof action>();
  let emailErr = actionData?.errors?.email;
  let passwordErr = actionData?.errors?.password;

  let [password, setPassword] = useState("");
  let [email, setEmail] = useState("");

  useEffect(() => {
    setPassword("");
  }, [passwordErr]);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-16">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Login Screen
          </h1>
        </header>

        <div className="p-16 bg-neutral-800 rounded-lg">
          <Form method="post" className="space-y-12">
            <div>
              <Label htmlFor="email">
                Email{" "}
                {emailErr && <span className="text-red-700">{emailErr}</span>}
              </Label>
              <Input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="password">
                Password{" "}
                {passwordErr && (
                  <span className="text-red-700">{passwordErr}</span>
                )}
              </Label>
              <Input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <Button type="submit" className="bg-neutral-200">
                Submit
              </Button>
            </div>

            <div>
              <p>
                Don't have an account?{" "}
                <Link to={"/register"} className="underline">
                  Sign Up.
                </Link>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
