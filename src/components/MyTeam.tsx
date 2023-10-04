import { SignIn, SignInButton, SignOutButton, UserButton, useSession, useUser } from "@clerk/nextjs";
import { ClerkProvider, SignUp } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/utils/api";

const Team = ["Captain", "1", "2", "3", "4", "5", "6", "7"] as const;



export function MyTeam (){
    const user = useUser();
    console.log(user)

    const [selectedTab, setSelectedTab] =
    useState<(typeof Team)[number]>("Captain");

    const session = useSession();



  const { data } = api.post.getAll.useQuery();



    return ( <div>
       <nav className="bg-slate-400 dark:bg-gray-1200">
        <div>
            {Team.map((tab) => {
              return (
                <div className="flex w-80 m-3">
                <h1 className="w-20">
                  {tab}
                </h1>
                <input type="text" />
                </div>
              );
            })}
            
            </div>
            </nav>
    </div> )
}

