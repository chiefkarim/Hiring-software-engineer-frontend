import { getUserInfos } from "@/app/document/action";
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
  const result = await readUserSession();
  if (result?.data.session) {
    const user = result.data.session.user;
    const userId = user.email;
    const response: any = await getUserInfos();
  
    if (response.error) {
      return new Response("Error while fetching the user", { status: 500 });
    }
    if (userId) {
      const userInfo = { name: response?.name, picture: response?.avatar };
      const { body, status } = await liveblocks.identifyUser(
        { userId: userId, groupIds: [] },
        {
          userInfo: userInfo,
        },
      );

      return new Response(body, { status });
    } else {
      return new Response("", { status: 403 });
    }
  } else {
    return new Response("", { status: 403 });
  }
}
