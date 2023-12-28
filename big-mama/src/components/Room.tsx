"use client";
import { ReactNode, useEffect, useMemo } from "react";
import { RoomProvider, useErrorListener } from "../../liveblocks.config";
import { usePathname, useSearchParams } from "next/navigation";
import { ClientSideSuspense } from "@liveblocks/react";
import Loading from "../app/loading";
import LiveblocksError from "./LiveblocksError";

export async function Room({
  children,
  id,
}: {
  children: ReactNode;
  id: string;
}) {
  if (id) {
    return (
      <RoomProvider
        id={id}
        initialPresence={{
          cursor: null,
        }}
      >
        <ClientSideSuspense fallback={<LiveblocksError />}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    );
  } else {
    return (
      <main>
        <h1>Wrong room id. please verify link</h1>
      </main>
    );
  }
}
