import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/utils/api";


const Team = ["Captain", "1", "2", "3", "4", "5", "6", "7"] as const;

const input = "m-2 rounded-full text-center bg-white w-40"
const button = "hover:bg-gray-100 m-2 p-2 rounded-full bg-slate-300"


const CreateCaptainWizard = () => {
    const {data} = api.captain.getAll.useQuery();
    const {user} = useUser();
    console.log(user)
    console.log(data)
    
  
    
    const [captain, setInput1] = useState("");
    const [weight, setInput2] = useState("");
    const [country, setInput3] = useState("");
  
    
  const ctx = api.useContext();
  
  
  const {mutate, isLoading : isPosting} = api.captain.create.useMutation({
    onSuccess: () =>{
    setInput1("")
    setInput2("")
    setInput3("")
  
    void ctx.captain.getAll.invalidate()
  }
  }
  );
  
  
  if (!user) return null;
  
  
  
  return (<div >
    
    
    <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4 bg-slate-200">
    
    <input
          placeholder="Captain"
          className={input}
          type="text"
          value= {captain}
          onChange={(e) => setInput1(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (captain !== "") {
                mutate({
                  captain: captain,
                  weight: Number(weight),
                  country: country,
                });
              }
            }
          }}
          disabled={isPosting}
          />
     <input
          placeholder="Weight"
          className={input}
          type="number"
          value= {weight}
          onChange={(e) => setInput2(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (weight !== "") {
                mutate({
                  captain: captain,
                  weight: Number(weight),
                  country: country,
                });
              }
            }
          }}
          disabled={isPosting}
          />
         <input
          placeholder="Country"
          className={input}
          type="text"
          value= {country}
          onChange={(e) => setInput3(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (country !== "") {
                mutate({
                  captain: captain,
                  weight: Number(weight),
                  country: country,
                });
              }
            }
          }}
          disabled={isPosting}
          />
          
   <button className={button} onClick={() => {
    if (country !== "" && weight !== "" && country !== "")
    mutate({
     captain: captain,
     weight: Number(weight),
     country: country,
   })}} >Post</button>
  </div>
  </div> 
  );
  
  };
  
   


export function MyTeam (){

  

    const user = useUser();
    console.log(user)




  const { data, refetch : refetchTab} = api.captain.getAll.useQuery();

  const deleteBet = api.captain.delete.useMutation({onSuccess: () => {
    void refetchTab();
  },});

 

    const [seed, setSeed] = useState(1);
    const reset = () => {
         setSeed(Math.random());
     }
    
   




  const  TableState = () => {
  console.log("newload")
  return(
  <div onClick={reset}>
    {data?.map((captain) => {
        return (
          <div key={seed}>
        <div className="bg-slate-400 dark:bg-gray-1200 rounded-lg" key={captain.captain.id}>
        <div className="flex w-120 m-3">
        <p className={input}>{captain.captain.captain}</p>
        <p className={input}>{captain.captain.weight}</p>
        <p className={input}>{captain.captain.country}</p>
        <button className="btn-warning btn-xs btn px-5" onClick={() => void deleteBet.mutate({ id: captain.captain.id })}>
         Delete
        </button>
        </div>
        </div>
        </div>)})}
</div>)
}



    return ( <div>
            <TableState key={seed}/>
            <CreateCaptainWizard/>
       <nav className="bg-slate-400 dark:bg-gray-1200 rounded-lg">
        <div>
            {Team.map((tab) => {
                return (
                    <div key={tab} className="flex w-120 m-3">
                <h1 key={tab} className="w-20 m-4 bg-slate-300 text-center rounded-full">
                  {tab}
                </h1>
                <div>                
                <input className={input} type="text" placeholder="Name"/>
                <input className={input} type="number" placeholder="Weight"/>
                <input className={input} type="text" placeholder="Country"/>
                <button className="hover:bg-gray-100 m-2 p-2 rounded-full bg-slate-300">Choose</button>
                </div>
                </div>
              );
            })}
            
            </div>
            </nav>
    </div> )
}

