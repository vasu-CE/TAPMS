import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { toast } from "sonner";
import axios from "axios";
import { HOME_API } from "@/lib/constant";

function CreateJoinTeam() {

    const [name , setName] = useState("");
    const [teamCode , setTeamCode] = useState("")

    const createTeamHandeler = async () => {
        try {
            const res = await axios.post(`${HOME_API}/students/create-team`, { name },
                { withCredentials: true }
            );

            if (res.data.success) {   
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "An error occurred");
        }
    };
    

    const joinTeamHandeler = async () => {
        try {
          const res = await axios.post(`${HOME_API}/students/join-team` ,{ teamCode },
            { withCredentials: true }
          );
    
          if (res.data.success) {
            toast.success(res.data.message);
            setTeamCode(""); 
          } else {
            toast.error(res.data.message);
          }
        } catch (err) {
          toast.error(err.response?.data?.message || err.message);
        }
      };
    
  return (
    <div>
      <Tabs defaultValue="create-team" className="w-[full] max-w-2xl">
        <TabsList className="w-full flex justify-between p-2 bg-gray-100 rounded-lg">
          <TabsTrigger value="create-team" className="flex-1 text-center">
            Create Team
          </TabsTrigger>
          <TabsTrigger value="join-team" className="flex-1 text-center">
            Join Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="create-team">
          <h2 className="text-xl font-semibold mb-4">Create a New Team</h2>
          <input
            type="text"
            placeholder="Enter Team Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
          <button className="w-full mt-4 p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md " onClick={createTeamHandeler}>
            Create Team
          </button>
        </TabsContent>

        <TabsContent value="join-team">
          <h2 className="text-xl font-semibold mb-4">Join a Team</h2>
          <input
            type="text"
            placeholder="Enter Team Code"
            value={teamCode}
            className="w-full p-2 border rounded-md"
          />
          <button className="w-full mt-4 p-2 bg-green-600 hover:bg-green-500 text-white rounded-md" onChange={joinTeamHandeler}>
            Join Team
          </button>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default CreateJoinTeam;
