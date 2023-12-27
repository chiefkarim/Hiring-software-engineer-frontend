"use server"

import readUserSession from "@/lib/actions";
//creates private document in liveblocks and 
export async function createDocument(id: string,metadata?:object) {
  const key = process.env.LIVEBLOCKS_SECRET_KEY;
  try {
    const session = await readUserSession()
    if (session?.data.session) {
      const user = session.data.session.user
      const userId = user.id
      const result = await fetch(`https://api.liveblocks.io/v2/rooms/`, {
        method: "POST",
        headers: { Authorization: `Bearer ${key}` }, body: JSON.stringify({
          id: id,
          metadata,
          defaultAccesses: [],
          usersAccesses: { [userId]: ["room:write"] }
        })
      })
      const data = await result.json()
      return data
    }else{
      return {status:403}
    }
  } catch (error) {
    return {error}
  }
}
// takes room id and checks with live blocks if the room exists
export async function roomExists(id: string) {
  const key = process.env.LIVEBLOCKS_SECRET_KEY;
  try {
    const result = await fetch(`https://api.liveblocks.io/v2/rooms/${id}`, {
      headers: { Authorization: `Bearer ${key}` },
    })
    const data = await result.json()
    if (data?.error === "ROOM_NOT_FOUND") return false
  } catch (error) {
    return error
  }
  return true
}