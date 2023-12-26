"use client";
import Loading from "@/app/loading";
import { useErrorListener } from "../../liveblocks.config";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

export default function LiveblocksError() {
  const [content, setContent] = useState(<Loading />);

  useErrorListener((error) => {
    switch (error?.code) {
      case -1:
        // Authentication error
        setContent(() => {
            return (<><NavBar loggedIn={true} />
            <main className="flex min-h-screen flex-col items-center justify-center text-xl  p-12 lg:p-24 bg-gradient-to-b from-purple to-indigo-600">
              <h1 className=" text-lg text-white">Authentication error. please make sure you have access to this room.</h1>
            </main>
            </>);
          });
        break;

      case 4001:
        // Could not connect because you don't have access to this room
        setContent(() => {
          return (<><NavBar loggedIn={true} />
          <main className="flex min-h-screen flex-col items-center justify-center text-xl  p-12 lg:p-24 bg-gradient-to-b from-purple to-indigo-600">
            <h1 className=" text-lg text-white">You don&#39;t have access to this room</h1>
          </main>
          </>);
        });
        break;

      case 4005:
        // Could not connect because room was full
        setContent(() => {
            return (<><NavBar loggedIn={true} />
            <main className="flex min-h-screen flex-col items-center justify-center text-xl  p-12 lg:p-24 bg-gradient-to-b from-purple to-indigo-600">
              <h1 className=" text-lg text-white">The Room is full. please try again later</h1>
            </main>
            </>);
          });
        break;

      default:
        // Unexpected error
        setContent(() => {
            return (<><NavBar loggedIn={true} />
            <main className="flex min-h-screen flex-col items-center justify-center text-xl  p-12 lg:p-24 bg-gradient-to-b from-purple to-indigo-600">
              <h1 className=" text-lg text-white">Unexpected error. please try again.</h1>
            </main>
            </>);
          });
        break;
    }
  });

  return content;
}
