"use client";
import { createDocument } from "@/app/document/action";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";

export default function CreateRoom() {
  const roomId = uuid();
  const { push } = useRouter();
  async function createRoom() {
    const result = await createDocument(roomId);
    if (result?.type) {
      push("/document/?roomid=" + roomId);
    }
  }
  return (
    <button
      onClick={createRoom}
      className="bg-white text-violet-600 m-5 px-3 py-1 rounded-md "
    >
      demo
    </button>
  );
}
