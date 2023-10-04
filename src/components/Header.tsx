import { SignIn, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { ClerkProvider, SignUp } from "@clerk/nextjs";
import { api } from "~/utils/api";



export function Header (){
    const user = useUser();
    console.log(user)



    return ( <div>
       <nav className="bg-slate-200 dark:bg-gray-1200">
    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-8 py-4 bg-slate-200">
            <span className="self-center text-2xl whitespace-nowrap dark:text-white">Fantasy Judo</span>
                <div className="flex items-center">
            <h1 className="font-bold mr-4">Hello {user.user?.firstName}</h1>
            <a href="#" className="text-sm  text-blue-600 dark:text-blue-500 hover:underline">
              {!user.isSignedIn && <SignInButton />}
              {!!user.isSignedIn && <UserButton /> }
              <SignIn path="/sign-in" routing="path" signUpUrl="/sign-up" />
              </a>
        </div>
    </div>
</nav>
    </div>)
}