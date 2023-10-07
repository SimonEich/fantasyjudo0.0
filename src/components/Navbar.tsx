import { useSession, useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/utils/api";

const TABS = ["Home", "Fantasy Judo Rules", "My Team" , "Create or Join a League", "View Leaderboard"] as const;



export function Navbar (){
    const user = useUser();
    console.log(user)

    const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Home");

    const session = useSession();



  const { data } = api.post.getAll.useQuery();



    return ( <div>
       <nav className="bg-slate-400 dark:bg-gray-1200">
        <div>
        {session.isSignedIn === true && (
          <div className="flex">
            {TABS.map((tab) => {
              return (
                <button
                key={tab}
                className={`flex-grow p-2 hover:bg-slate-300 focus-visible:bg-gray-200 ${
                  tab === selectedTab
                  ? "border-b-4 border-b-blue-500 font-bold"
                  : ""
                }`}
                  onClick={() => setSelectedTab(tab)
                  }
                >
                  {tab}
                </button>
              );
            })}
            </div>)}
            </div>
            </nav>
    </div> )
}

