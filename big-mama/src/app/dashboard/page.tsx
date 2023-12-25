import NavBar from "@/components/NavBar";
import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  let loggedIn = false;
  const result = await readUserSession();
  if (result?.data.session) {
    loggedIn = true;
  } else {
    return redirect("/auth/signin");
  }
  return (
    <>
      <NavBar loggedIn={loggedIn} />
      <main className="flex min-h-screen flex-col items-center justify-center text-xl  p-12 lg:p-24 bg-gradient-to-b from-purple to-indigo-600"></main>
    </>
  );
}
