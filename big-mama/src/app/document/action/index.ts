"use server"
export async function createDocument() {

}
// takes room id and checks with live blocks if the room exists
export async function roomExists(id: string) {
  const key = process.env.LIVEBLOCKS_SECRET_KEY;
  const result = await fetch(`https://api.liveblocks.io/v2/rooms/${id}`, {
    headers: { Authorization: `Bearer ${key}` },
  })
  const data = await result.json()
  if (data?.error === "ROOM_NOT_FOUND") return false
  return true
}