import { Room } from "@/components/Room";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import NavBar from "@/components/NavBar";
import { roomExists } from "./action";
import { redirect } from "next/navigation";
import readUserSession from "@/lib/actions";

export default async function Document({ searchParams }: any) {
  const id = searchParams?.roomid;
  const exists = await roomExists(id || "");
  let loggedIn = false;

  //checking if user is logged in
  const result = await readUserSession();
  if (result?.data.session) {
    loggedIn = true;
  } else {
    redirect("/");
  }

  //check if room exists before join
  if (exists === false) {
    return (
      <>
        <NavBar loggedIn={loggedIn} />
        <main className="flex min-h-screen  flex-col items-center justify-center text-xl  p-12 lg:p-24 bg-gradient-to-b from-purple to-indigo-600">
          <h1 className=" text-lg text-white">
            Room does not exist, please check your link.{" "}
            <a href="/dashboard" className="  opacity-50">
              Dashboard
            </a>
          </h1>
        </main>
      </>
    );
  } else {
    return (
      <Room id={id}>
        <NavBar loggedIn={true} />
        <CollaborativeEditor />
      </Room>
    );
  }
}
