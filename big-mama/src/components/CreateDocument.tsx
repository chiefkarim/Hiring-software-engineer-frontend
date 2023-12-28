"use client";
import { createDocument } from "@/app/document/action";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";

export default function CreateDocument() {
  const roomId = uuid();
  const router = useRouter();
  const [error,setError] = useState("")
  const [inputs, setInputs] = useState({title:"",type:""});
//checks info before creating room
  async function createRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(inputs.type != "" && inputs.title != ""){
      const result = await createDocument({id:roomId,title:inputs.title,type:inputs.type});
      if (result?.type) {
        router.push("/document/?roomid=" + roomId);
      } else if (result?.status === 403) {
        router.push("/auth/signin");
      }
      
    }else{
      setError(()=>{return "please enter document title and select Document Type!"})
    }
    
  }

  //updates input values
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <form onSubmit={createRoom} className="flex  flex-wrap gap-2 text-white">
      <div className="max-w-md mx-auto mt-8 p-6  rounded-md shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Add Project</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 p-2 rounded-md text-black "
            placeholder="Enter project name"
            value={inputs.title || ""}
            onChange={handleChange}
            name="title"
          />
          <input type="radio" id="option1" name="type" value="public" onChange={handleChange}/>
<label htmlFor="option1">Public</label>
<input type="radio" id="option2" name="type" value="private" onChange={handleChange}/>
<label htmlFor="option2" >Private</label>
          <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Add
          </button>
        </div>
          <span className=" text-gray-300 ">{error}</span>
      </div>
    </form>
  );
}
