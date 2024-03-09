import CreateDocument from "@/components/CreateDocument";
import DisplayDocuments from "@/components/DisplayDocuments";
import { NavBar } from "@/components/NavBar";
import readUserSession from "@/lib/actions";
import { Liveblocks } from "@liveblocks/node";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";

export default async function Dashboard() {
  let loggedIn = false;
  const result = await readUserSession();
  noStore();
  if (result?.data.session) {
    const userId = result.data.session.user.email;

    loggedIn = true;
    const SECRET_KEY = process.env.LIVEBLOCKS_SECRET_KEY;
    const liveblocks = new Liveblocks({
      secret: SECRET_KEY!,
    });
    const { data: rooms, nextPage } = await liveblocks.getRooms({
      userId: userId,
    });

    return (
      <>
        <NavBar loggedIn={loggedIn} />
        <main className="flex min-h-screen flex-col items-center justify-center text-xl gap-4 px-12 lg:px-24 bg-gradient-to-b from-purple to-indigo-600">
          <CreateDocument />
          <h1 className="text-white">Rooms:</h1>
          <DisplayDocuments rooms={rooms} />
        </main>
      </>
    );
  } else {
    return redirect("/auth/signin");
  }
}
