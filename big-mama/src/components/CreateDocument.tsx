"use client";
import { createDocument } from "@/app/document/action";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { ChangeEvent, useState } from "react";

export default function CreateDocument() {
  const roomId = uuid();
  const { push } = useRouter();
  const [input, setInput] = useState("");
  async function createRoom() {
    try {
      const result = await createDocument(roomId, { title: input });
      if (result?.type) {
        push("/document/?roomid=" + roomId);
      } else if (result?.status === 403) {
        console.log("please log in");
      }
    } catch (error) {
      console.error(error);
    }
  }

  //updates input values
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    
    const newValue = event.target.value;
    setInput(() => {
      return newValue
    });
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
            value={input || ""}
            onChange={handleChange}
          />
          <button className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">
            Add
          </button>
        </div>
      </div>
    </form>
  );
}
