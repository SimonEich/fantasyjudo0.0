import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { string } from "zod";
import { prisma } from "~/server/db";
import { api } from "~/utils/api";


const Team = ["Captain", "1", "2", "3", "4", "5", "6", "7"] as const;

const input = "m-2 rounded-full text-center bg-white w-40"
const button = "hover:bg-gray-100 m-2 p-2 rounded-full bg-slate-300"


const  TableTeamState = () => {


  const { data, refetch : refetchTab} = api.team.getAll.useQuery();
  const deleteBet = api.team.delete.useMutation({onSuccess: () => {
    void refetchTab();
  },});

 
return(
<div>
  {data?.map((team) => {
      return (
        <div key={team.team.id}>
      <div className="bg-slate-600 dark:bg-gray-1200 rounded-lg" key={team.team.id}>
      <div className="flex w-120 m-3">
      <p className={input}>{team.team.player}</p>
      <p className={input}>{team.team.weight}</p>
      <p className={input}>{team.team.country}</p>
      <button className="btn-warning btn-xs btn px-5" onClick={() => void deleteBet.mutate({ id: team.team.id })}>
       Delete
      </button>
      </div>
      </div>
      </div>)})}
</div>)
}

const  TableNameState = () => {


  const { data, refetch : refetchTab} = api.name.getAll.useQuery();
  

 
return(
<div>
  {data?.map((name) => {
      return (
        <div key={name.name.id}>
      <div className="bg-slate-600 dark:bg-gray-1200 rounded-lg" key={name.name.id}>
      <div className="flex w-120 m-3">
      <p className={input}>{name.name.name}</p>
      </div>
      </div>
      </div>)})}
</div>)
}



const CreateTeamWizard = () => {
  const {data} = api.team.getAll.useQuery();
  const {user} = useUser();
  

  
  const [player, setInput1] = useState("");
  const [weight, setInput2] = useState("");
  const [country, setInput3] = useState("");

  
const ctx = api.useContext();


const {mutate, isLoading : isPosting} = api.team.create.useMutation({
  onSuccess: () =>{
  setInput1("")
  setInput2("")
  setInput3("")

  void ctx.team.getAll.invalidate()
}
}
);


if (!user) return null;



return (<div >
  
  
  <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4 bg-slate-400">
  
  <input
        placeholder="Player"
        className={input}
        type="text"
        value= {player}
        onChange={(e) => setInput1(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (player !== "") {
              mutate({
                player: player,
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
                player: player,
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
                player: player,
                weight: Number(weight),
                country: country,
              });
            }
          }
        }}
        disabled={isPosting}
        />
        
 <button className={button} onClick={() => {
  if (player !== "" && weight !== "" && country !== "")
  mutate({
   player: player,
   weight: Number(weight),
   country: country,
 })}} >Post</button>
</div>
</div> 
);

};


const CreateCaptainWizard = () => {
    const {data} = api.name.getAll.useQuery();
    const {user} = useUser();
    console.log(user)
    console.log(data)
    
  
    
    const [name, setInput1] = useState("");
  
    
  const ctx = api.useContext();
  
  
  const {mutate, isLoading : isPosting} = api.name.create.useMutation({
    onSuccess: () =>{
    setInput1("")
    setInput2("")
    setInput3("")
  
    void ctx.name.getAll.invalidate()
  }
  }
  );
  
  
  if (!user) return null;
  
  
  
  return (<div >
    
    
    <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4 bg-slate-200">
    
    <input
          placeholder="Name"
          className={input}
          type="text"
          value= {name}
          onChange={(e) => setInput1(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (name !== "") {
                mutate({
                  name: name,
                });
              }
            }
          }}
          disabled={isPosting}
          />
          
   <button className={button} onClick={() => {
    if (name !== "")
    mutate({
     name: name,
   })}} >Post</button>
  </div>
  </div> 
  );
  
  };
  
   


export function MyTeam (){




    return ( <div>

        
            <div className="flex w-120 m-3">
        <h1 className="w-20 m-4 bg-slate-300 text-center rounded-full">
        </h1>
        <div>
            <TableNameState/>
            <CreateCaptainWizard/>
            <TableTeamState/>
            <CreateTeamWizard/>
        </div>
       </div>

            
    </div> )
}

//<nav className="bg-slate-400 dark:bg-gray-1200 rounded-lg">
//<div>
//    {Team.map((tab) => {
//        return (
//            <div key={tab} className="flex w-120 m-3">
//        <h1 key={tab} className="w-20 m-4 bg-slate-300 text-center rounded-full">
//          {tab}
//        </h1>
//        <div>                
//        <input className={input} type="text" placeholder="Name"/>
//        <input className={input} type="number" placeholder="Weight"/>
//        <input className={input} type="text" placeholder="Country"/>
//        <button className="hover:bg-gray-100 m-2 p-2 rounded-full bg-slate-300">Choose</button>
//        </div>
//       </div>
//      );
//    })}
//    
//    </div>
//    </nav>

