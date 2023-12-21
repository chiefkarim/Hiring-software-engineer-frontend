import { RoomProvider } from "../../../liveblocks.config";
import Room from "./room";
import { ClientSideSuspense } from "@liveblocks/react";
import Loading from "../loading";


export default function App() {
  const roomId = "liveblocks-tutorial-diovkOaGdBFi2hT795WVa";
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={<Loading/>}>
        {() => <Room />}
      </ClientSideSuspense>
    </RoomProvider>
  );
}
