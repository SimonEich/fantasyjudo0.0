import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { api } from "~/utils/api";



const input = "m-2 rounded-full text-center bg-white w-40"
const button = "hover:bg-gray-100 m-2 p-2 rounded-full bg-slate-300"

const CreateWinnerWizard = () => {

      const {user} = useUser();
      console.log(user)

      function winnerdata(){
      const {data} = api.winner.getAll.useQuery();
      const x = data?.map((winner)=> (winner.winner.player))
      //console.log(x)
      return x
      }
      function teamdata(){
        const {data} = api.team.getAll.useQuery();
        const z = data?.map((team)=> (team.team.player))
        //console.log(z)
        return z
        }
      
      const x = winnerdata();
      const z = teamdata();
    if(x!==undefined && z!==undefined) {
      const missing = z.filter(item => x.includes(item));
      console.log("Missing"+missing.length)
    }

      
      const [player, setInput1] = useState("");
      const [weight, setInput2] = useState("");
      const [country, setInput3] = useState("");
      const [rank, setInput4] = useState("");

      
    const ctx = api.useContext();
    
    
    const {mutate, isLoading : isPosting} = api.winner.create.useMutation({
      onSuccess: () =>{
      setInput1("")
      setInput2("")
      setInput3("")
      setInput4("")
    
      void ctx.winner.getAll.invalidate()
    }
    }
    );
    
    
    if (!user) return null;
    
    
    
    return (<div >
      
      
      <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4 bg-slate-200">

      <input
            placeholder="Rank"
            className={input}
            type="text"
            value= {rank}
            onChange={(e) => setInput4(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (country !== "") {
                  mutate({
                    player: player,
                    weight: Number(weight),
                    country: country,
                    rank: Number(rank),
                  });
                }
              }
            }}
            disabled={isPosting}
            />
      
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
                    rank: Number(rank),
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
                    rank: Number(rank),

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
                    rank: Number(rank),

                  });
                }
              }
            }}
            disabled={isPosting}
            />
            
            
     <button className={button} onClick={() => {
      if (country !== "" && weight !== "" && country !== "")
      mutate({
       player: player,
       weight: Number(weight),
       country: country,
       rank: Number(rank),
     })}} >Post</button>
    </div>
    </div> 
    );
    
    };
    
     


const CreateTimeEndWizard = () => {
  const {user} = useUser();
  

  
  const [day,   setInput1] = useState("");
  const [month, setInput2] = useState("");
  const [year,  setInput3] = useState("");
  const [hour,  setInput4] = useState("");
  const [competitionName, setInput5] = useState("");


  
const ctx = api.useContext();


const {mutate, isLoading : isPosting} = api.time.create.useMutation({
  onSuccess: () =>{
  setInput1("")
  setInput2("")
  setInput3("")
  setInput4("")
  setInput5("")

  void ctx.time.getAll.invalidate()
}
}
);


if (!user) return null;



return (<div >
  
  
  <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4 bg-slate-400">
  
  <input
        placeholder="Year"
        className={input}
        type="Number"
        value= {year}
        onChange={(e) => setInput3(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (year !== "") {
              mutate({
                hour: Number(hour),
                day: Number(day),
                month: Number(month),
                year: Number(year),
                competitionName: competitionName,
              });
            }
          }
        }}
        disabled={isPosting}
        />
   <input
        placeholder="Month"
        className={input}
        type="number"
        value= {month}
        onChange={(e) => setInput2(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (month !== "") {
              mutate({
                hour: Number(hour),
                day: Number(day),
                month: Number(month),
                year: Number(year),
                competitionName: competitionName,
              });
            }
          }
        }}
        disabled={isPosting}
        />
       <input
        placeholder="Day"
        className={input}
        type="number"
        value= {day}
        onChange={(e) => setInput1(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (day !== "") {
              mutate({
                hour: Number(hour),
                day: Number(day),
                month: Number(month),
                year: Number(year),
                competitionName: competitionName,
              });
            }
          }
        }}
        disabled={isPosting}
        />
        <input
        placeholder="Hour"
        className={input}
        type="number"
        value= {hour}
        onChange={(e) => setInput4(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (hour !== "") {
              mutate({
                hour: Number(hour),
                day: Number(day),
                month: Number(month),
                year: Number(year),
                competitionName: competitionName,
              });
            }
          }
        }}
        disabled={isPosting}
        />
        <input
        placeholder="Competition Name"
        className={input}
        type="text"
        value= {competitionName}
        onChange={(e) => setInput5(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (competitionName !== "") {
              mutate({
                hour: Number(hour),
                day: Number(day),
                month: Number(month),
                year: Number(year),
                competitionName: competitionName,
              });
            }
          }
        }}
        disabled={isPosting}
        />
        
 <button className={button} onClick={() => {
  if (year !== "" && month !== "" && day !== "" && hour !== "")
  mutate({
    hour: Number(hour),
    day: Number(day),
    month: Number(month),
    year: Number(year),
    competitionName: competitionName,
 })}} >Post</button>
</div>
</div> 
);

};



export function Admin (){




    return ( <div>

        
            <div className="flex w-120 m-3">
        <h1 className="w-20 m-4 bg-slate-300 text-center rounded-full">
        </h1>
        <div>
            <CreateTimeEndWizard/>
            <CreateWinnerWizard/>
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

