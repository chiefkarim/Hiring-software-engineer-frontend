"use client";
import { Room } from "@/components/Room";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";

export default function Home() {
  const roomId = uuid();
  const { push } = useRouter();
  function createRoom() {
    push("/document/?roomid=" + roomId);
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-xl   p-24 bg-gradient-to-r from-gray-200 via-gray-400 to-gray-600">
      <h1>welcome</h1>
      <button
        onClick={createRoom}
        className="bg-white m-5 px-3 py-1 rounded-md "
      >
        new public room
      </button>
    </main>
  );
}
