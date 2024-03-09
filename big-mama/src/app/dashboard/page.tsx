import CreateDocument from "@/components/CreateDocument";
import DisplayDocuments from "@/components/DisplayDocuments";
import { NavBar } from "@/components/NavBar";
import readUserSession from "@/lib/actions";
import { Liveblocks } from "@liveblocks/node";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { SparklesCore } from "@/components/sparkles";
import { Meteors } from "@/components/meteors";

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
        <NavBar loggedIn={loggedIn} props="bg-black" />
        <main className="flex relative min-h-screen flex-col items-center justify-center text-xl gap-4 px-12 lg:px-24 bg-black">
          <CreateDocument />
          <h1 className="text-primary-foreground">Rooms:</h1>
          <DisplayDocuments rooms={rooms} />
        </main>
      </>
    );
  } else {
    return redirect("/auth/signin");
  }
}
