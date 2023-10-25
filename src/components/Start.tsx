import { useUser } from "@clerk/nextjs";
import { useState } from "react";





export function Start (){
    const user = useUser();
    console.log(user)

    const TABS = ["Home", "Fantasy Judo Rules", "My Team" , "Create or Join a League", "View Leaderboard"] as const;


    const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Home");



    return ( <div>
    


            {TABS.map((tab) => {
              return (
                <div className="text-center"><button
                key={tab}
                className={`flex-grow w-80 text-lg p-2 m-8 bg-slate-400 rounded-full hover:bg-gray-200 focus-visible:bg-gray-200 ${
                  (tab === selectedTab && selectedTab !== "Home")
                  ? "border-b-4 border-b-blue-500 font-bold"
                  : "border-black bg-slate-100 "
                }`}
                  onClick={() => setSelectedTab(tab)
                  }
                >
                  {tab}
                </button>
                </div>
              );
            })}
    
    </div>)
        }

export function Tab(){
    const user = useUser();
    console.log(user)




}