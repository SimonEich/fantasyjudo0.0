
import { useSession, useUser } from "@clerk/clerk-react";
import Head from "next/head";
import { useState } from "react";
import { CreateJoinLeagues } from "~/components/CreateJoinLeagues";
import { Header } from "~/components/Header";
import { MyTeam } from "~/components/MyTeam";
import { Rules } from "~/components/Rules";
import MediaQuery from 'react-responsive'

import { AiFillHome } from 'react-icons/ai';

import { api } from "~/utils/api";
import type { RouterOutputs } from "~/utils/api";
 

const TABS = ["Home", "Fantasy Judo Rules", "My Team" , "Create or Join a League", "View Leaderboard"] as const;





const CreateTestWizard = () => {
  const {data} = api.test.getAll.useQuery();
  const {user} = useUser();
  console.log(data)


  

  
  const [input, setInput] = useState("");
  
const ctx = api.useContext();


const {mutate, isLoading : isPosting} = api.test.create.useMutation({
  onSuccess: () =>{
  setInput("")
  void ctx.test.getAll.invalidate()
}
}
);


if (!user) return null;



return (<div >
  
  <div>
    {data?.map((test) => (<div key={test.test.id}>{test.test.content}</div>))}
  </div>

  <div>
  <input
        placeholder="Content"
        className="grow bg-grey outline-none"
        type="text"
        value= {input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({
                content: input,
                test: input
              });
            }
          }
        }}
        disabled={isPosting}
  />
  </div>
        
 <button onClick={() => mutate({
   content: input,
   test:input,
 })} >Post</button>
</div>
);

};

const Start = () => {
  const user = useUser();
  console.log(user)

  const TABS = ["Home", "Fantasy Judo Rules", "My Team" , "Create or Join a League", "View Leaderboard"] as const;


  const [selectedTab, setSelectedTab] =
  useState<(typeof TABS)[number]>("Home");



  return ( <div>
  


          {TABS.map((prop) => {
            return (
              <div key={prop} className="text-center"><button
              key={prop}
              className={`flex-grow w-80 text-lg p-2 m-8 bg-slate-400 rounded-full hover:bg-gray-200 focus-visible:bg-gray-200 ${
                (prop === selectedTab && selectedTab !== "Home")
                ? "border-b-4 border-b-blue-500 font-bold"
                : "border-black bg-slate-100 "
              }`}
                onClick={() => setSelectedTab(prop)
                }
              >
                {prop}
              </button>
              </div>
            );
          })}
  
  </div>)
      };


const CreateNameWizard = () => {
  const {data} = api.name.getAll.useQuery();
  const {user} = useUser();
  console.log(data)


  

  
  const [input, setInput] = useState("");
  
const ctx = api.useContext();


const {mutate, isLoading : isPosting} = api.name.create.useMutation({
  onSuccess: () =>{
  setInput("")
  void ctx.name.getAll.invalidate()
}
}
);


if (!user) return null;



return (<div className="bg-sky-300	">
  
  
  <div>
    {data?.map((name) => (<div key={name.name.id}>{name.name.name}</div>))}
  </div>

  <div>
  <input
        placeholder="Content"
        className="grow bg-grey outline-none"
        type="text"
        value= {input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ name: input });
            }
          }
        }}
        disabled={isPosting}
  />
  </div>
        
 <button onClick={() => mutate({name : input})} >Post</button>
</div>
);
 
};




const CreatePostWizard = () => {
  const {data} = api.post.getAll.useQuery();
  const {user} = useUser();
  console.log(data)
  

  
  const [input, setInput] = useState("");
  
const ctx = api.useContext();


const {mutate, isLoading : isPosting} = api.post.create.useMutation({
  onSuccess: () =>{
  setInput("")
  void ctx.post.getAll.invalidate()
}
}
);


if (!user) return null;



return (<div >
  
  
  <div className="flex justify-between items-center mx-auto max-w-screen-xl p-4 bg-slate-200">
  
  <input
        placeholder="Content"
        className="grow bg-transparent outline-none"
        type="text"
        value= {input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content : input });
            }
          }
        }}
        disabled={isPosting}
        />
        
 <button onClick={() => mutate({content : input})} >Post</button>
</div>
</div> 
);

};

type PostWithUser = RouterOutputs["post"]["getAll"][number]


const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  console.log(author);
  return (
    <div key={post.id} className="border-b border-slate-400 p-8">
              {post.content}
              <span>  @{author?.username ?? author?.fullname}</span>
            </div>
  );

}
const Feed = () => {
  const {data, isLoading: postsLoading } = api.post.getAll.useQuery();

  if (postsLoading) return <div>loading</div>;
 

  if (!data) return <div>Something went wrong</div>


  return (
    <div className="flex grow flex-col overflow-y-scroll">
      {[...data].map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  )

}






export default function Home() {

  const [selectedTab, setSelectedTab] =
    useState<(typeof TABS)[number]>("Home");

    const session = useSession();




console

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <Header/>
          <div>
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
    </div>


      <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="">
        


        
      {selectedTab === "Home" ? <Start /> :<div></div>}
      {selectedTab === "Fantasy Judo Rules" ? <><Rules /><Feed /><CreatePostWizard /> </>: <div></div>}
      {selectedTab === "View Leaderboard" ? <><CreateTestWizard /><CreateNameWizard /></> : <div></div>}
      {selectedTab === "My Team" ? <MyTeam /> : <div></div>}
      {(selectedTab === "Create or Join a League" ) ? <CreateJoinLeagues/>: <div></div>}


        </div>
        <div>
    <h1>Device Test!</h1>
    <MediaQuery minWidth={120} maxWidth={121}>
      <p>You are a desktop or laptop</p>
      </MediaQuery>
      <MediaQuery minWidth={122}>
        <p>You also have a huge screen</p>
      </MediaQuery>
    <MediaQuery minResolution="2dppx">
      
  
    </MediaQuery>
  </div>

      </main>
    </>
  );
}


