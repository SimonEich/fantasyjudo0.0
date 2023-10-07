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
       <nav className="bg-slate-400 dark:bg-gray-1200 rounded-lg">
        <div>
            {Team.map((tab) => {
              return (
                <div className="flex w-120 m-3">
                <h1 className="w-20 m-4 bg-slate-300 text-center rounded-full">
                  {tab}
                </h1>
                <div>                
                <input className="m-2 rounded-full text-center" type="text" placeholder="Name"/>
                <input className="m-2 rounded-full text-center" type="number" placeholder="Weight"/>
                <input className="m-2 rounded-full text-center" type="text" placeholder="Country"/>
                <button className="hover:bg-gray-100 m-2 p-2 rounded-full bg-slate-300  ">Choose</button>
                </div>
                </div>
              );
            })}
            
            </div>
            </nav>
    </div> )
}

