"use client";

import { ReactNode, useMemo } from "react";
import { RoomProvider } from "../../liveblocks.config";
import { usePathname, useSearchParams } from "next/navigation";
import { ClientSideSuspense } from "@liveblocks/react";
import Loading from "../app/loading";

export function Room({ children }: { children: ReactNode }) {
  const id = useSearchParams().get("roomid");

  if (id) {
    return (
      <RoomProvider
        id={id}
        initialPresence={{
          cursor: null,
        }}
      >
        <ClientSideSuspense fallback={<Loading />}>
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
