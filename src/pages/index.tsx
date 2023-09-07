import { SignIn, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/clerk-react";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";

export default function Home() {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  const user = useUser();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <div>
        <a href="#" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
              {!user.isSignedIn&&<SignInButton />}
              {!!user.isSignedIn&&<UserButton/>}
              <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
              </a>
        </div>
      </main>
    </>
  );
}
