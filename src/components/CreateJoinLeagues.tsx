import { SignIn, SignInButton, SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { ClerkProvider, SignUp } from "@clerk/nextjs";
import { api } from "~/utils/api";



export function CreatJoinLeague (){
    const user = useUser();
    console.log(user)



    return ( <div>
       <nav className="bg-slate-200 dark:bg-gray-1200">
   <h1>Create</h1>
   <h1>Join</h1>
   <h1>League</h1>
</nav>
    </div>)
}