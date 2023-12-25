import readUserSession from "@/lib/actions";
import { Liveblocks } from "@liveblocks/node";
import { NextRequest, NextResponse } from "next/server";

// Authenticating your Liveblocks application
// https://liveblocks.io/docs/rooms/authentication/access-token-permissions/nextjs

const SECRET_KEY = process.env.LIVEBLOCKS_SECRET_KEY;

const liveblocks = new Liveblocks({
  secret: SECRET_KEY!,
});

export async function POST(request: NextRequest) {

  const result = await readUserSession()
  if (result?.data.session) {
    const user = result.data.session.user
    const userId = user.id
    console.log(`id:${userId}`)

    const session = liveblocks.prepareSession(`user-${userId}`, {
      userInfo: {
        name: "Charlie Layne",
        color: "#D583F0",
        permission: "none",
        picture: "https://liveblocks.io/avatars/avatar-1.png",
      }
    })
    const { room } = await request.json();
    session.allow(room, session.FULL_ACCESS)
    const { body, status } = await session.authorize();
    console.log(`body:${body}, status:${status}`)
    return new Response(body, { status });
  } else {


    // Get the current user's unique id from your database
    const userId = Math.floor(Math.random() * 10) % USER_INFO.length;

    // Create a session for the current user
    // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
    const session = liveblocks.prepareSession(`user-${userId}`, {
      userInfo: USER_INFO[userId],
    });

    // Give the user access to the room
    const { room } = await request.json();

    session.allow(room, session.FULL_ACCESS);

    // Authorize the user and return the result
    const { body, status } = await session.authorize();
    console.log(`body:${body}, status:${status}`)
    return new Response(body, { status });
  }
}

const USER_INFO = [

  {
    name: "Mislav Abha",
    color: "#F08385",
    permission: "none",
    picture: "https://liveblocks.io/avatars/avatar-2.png",
  },
  {
    name: "Tatum Paolo",
    color: "#F0D885",
    permission: "none",
    picture: "https://liveblocks.io/avatars/avatar-3.png",
  },
  {
    name: "Anjali Wanda",
    color: "#85EED6",
    permission: "none",
    picture: "https://liveblocks.io/avatars/avatar-4.png",
  },
  {
    name: "Jody Hekla",
    color: "#85BBF0",
    permission: "none",
    picture: "https://liveblocks.io/avatars/avatar-5.png",
  },
  {
    name: "Emil Joyce",
    color: "#8594F0",
    permission: "none",
    picture: "https://liveblocks.io/avatars/avatar-6.png",
  },
  {
    name: "Jory Quispe",
    permission: "none",
    color: "#85DBF0",
    picture: "https://liveblocks.io/avatars/avatar-7.png",
  },
  {
    name: "Quinn Elton",
    color: "#87EE85",
    permission: "none",
    picture: "https://liveblocks.io/avatars/avatar-8.png",
  },
];