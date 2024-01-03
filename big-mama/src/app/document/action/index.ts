"use server";

import readUserSession from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/supabase";
import { revalidatePath } from "next/cache";
import { Liveblocks } from "@liveblocks/node";
//creates private document in liveblocks and
const liveblocks = new Liveblocks({
  secret:
    "sk_dev_MbBwdj_7ZJ8Zca7zxVwrttJ2eUzE5ZINi8LOxOmc43BkORlbPMokF3p8MVii89sk",
});
export async function createDocument({
  id,
  title,
  type,
}: {
  id: string;
  title: string;
  type: string;
}) {
  const key = process.env.LIVEBLOCKS_SECRET_KEY;
  const metadata = { title: title, type: "private" };
  let defaultAccess: any = ["room:read", "room:presence:write"];
  if (type === "public") {
    defaultAccess = ["room:write"];
    metadata.type = "public";
  }

  try {
    const session = await readUserSession();
    if (session?.data.session) {
      const user = session.data.session.user;
      const userId = user.email;
      if (userId) {
        const result = await fetch(`https://api.liveblocks.io/v2/rooms/`, {
          method: "POST",
          headers: { Authorization: `Bearer ${key}` },
          body: JSON.stringify({
            id: id,
            metadata,
            defaultAccesses: defaultAccess,
            usersAccesses: { [userId]: ["room:write"] },
          }),
        });

        const data = await result.json();
       
        return data;
      } else {
        return { status: 403 };
      }
    } else {
      return { status: 403 };
    }
  } catch (error) {
    return { error };
  }
}
// takes room id and checks with live blocks if the room exists
export async function roomExists(id: string) {
  const key = process.env.LIVEBLOCKS_SECRET_KEY;
  try {
    const result = await fetch(`https://api.liveblocks.io/v2/rooms/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${key}` },
    });
    const data = await result.json();

    if (result.status === 404) {
      return false;
    }
    if (data?.error === "ROOM_NOT_FOUND") return false;
  } catch (error) {
    return error;
  }
  return true;
}

export async function getUserInfos() {
  const supabase:any = await createSupabaseServerClient();
  const result = await supabase.from("users").select("*");

  if (result.error) {
    throw new Error(result.error.message);
  }
  return result.data[0];
}

export async function deleteDocument(id: string) {
  const key = process.env.LIVEBLOCKS_SECRET_KEY;
  try {
    const result = await fetch(`https://api.liveblocks.io/v2/rooms/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${key}` },
    });

    revalidatePath("/dashboard");
    revalidatePath("/document");
  } catch (error) {
    return error
  }
}

export async function updateUserPermission(
  roomId: string,
  userId: string,
  permission: string,
) {
  let updatedPermission: any;
  if (permission === "write") {
    updatedPermission = ["room:write"];
  } else if (permission === "read") {
    updatedPermission = null;
  }

  const room = await liveblocks.updateRoom(roomId, {
    // Optional, update the room's user ID permissions
    usersAccesses: {
      [userId]: updatedPermission,
    },
  });
  
  revalidatePath("/document");
  revalidatePath("/dashboard");

  return room;
}
