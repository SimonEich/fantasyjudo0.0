import { useUser } from "@clerk/clerk-react";
import { api } from "~/utils/api";


export function Leaderboard (){
  const user = useUser();

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
      function playerdata(){
        const {data} = api.team.getAll.useQuery();
        const y = data?.map((team)=> (team.team.player))
        //console.log(z)
        return y
        }
    
    const x = winnerdata();
    const z = teamdata();
    const y = playerdata()
    function score(){
  if(x!==undefined && z!==undefined) {
    const match = z.filter(item => x.includes(item));
    //const player = z.filter(y)
    console.log(y)
    return match.length 
  }}
  return(
  <div>
    <h1 onClick={()=>console.log(teamdata)}>Will be available soon</h1>
    <h1>{user.user?.firstName}, your score is {score()}</h1>
    <div>
      {y.map((a)=>{return (<h1>{a}</h1>)})}
    </div>

   
    </div>)

    
        }

