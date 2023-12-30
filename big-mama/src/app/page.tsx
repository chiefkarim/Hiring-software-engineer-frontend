import { redirect } from "next/navigation";
import NavBar from "@/components/NavBar";
import readUserSession from "@/lib/actions";
import DemoAccounts from "@/components/DemoAccounts";

export default async function Home() {
  let loggedIn = false;
  //checking if user is logged in

  const result = await readUserSession();

  if (result?.data.session) {
    loggedIn = true;
    redirect("/dashboard")
  }
  return (
    <>
      <NavBar loggedIn={loggedIn} />
      <main className="flex min-h-screen text-white flex-col items-center justify-center text-xl   p-12 lg:p-24 bg-gradient-to-b from-purple to-indigo-600">
        <DemoAccounts/>
      </main>
    </>
  );
}
