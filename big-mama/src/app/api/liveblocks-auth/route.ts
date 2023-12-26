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
    console.log(`id:${userId},user:${user}`)
    const { body, status } = await liveblocks.identifyUser({ userId: userId, groupIds: [] }, {
      userInfo: {
        name: "Charlie Layne",
        color: "#D583F0",
        picture: "https://liveblocks.io/avatars/avatar-1.png",
      }
    })
    return new Response(body, { status })

  } else {


    // Get the current user's unique id from your database
    const userId = Math.floor(Math.random() * 10) % USER_INFO.length;

    // Create a session for the current user
    // userInfo is made available in Liveblocks presence hooks, e.g. useOthers
    const result = await liveblocks.identifyUser(`user-${userId}`, {
      userInfo: USER_INFO[userId]
    })
    return new Response(result.body, { status: result.status })

    
  }
}

const USER_INFO = [

  {
    name: "Mislav Abha",
    color: "#F08385",
    id: 0,
    picture: "https://liveblocks.io/avatars/avatar-2.png",
  },
  {
    name: "Tatum Paolo",
    color: "#F0D885",
    id: 1,
    picture: "https://liveblocks.io/avatars/avatar-3.png",
  },
  {
    name: "Anjali Wanda",
    color: "#85EED6",
    id: 2,
    picture: "https://liveblocks.io/avatars/avatar-4.png",
  },
  {
    name: "Jody Hekla",
    color: "#85BBF0",
    picture: "https://liveblocks.io/avatars/avatar-5.png",
  },
  {
    name: "Emil Joyce",
    color: "#8594F0",
    picture: "https://liveblocks.io/avatars/avatar-6.png",
  },
  {
    name: "Jory Quispe",
    color: "#85DBF0",
    picture: "https://liveblocks.io/avatars/avatar-7.png",
  },
  {
    name: "Quinn Elton",
    color: "#87EE85",
    picture: "https://liveblocks.io/avatars/avatar-8.png",
  },
];