import readUserSession from "@/lib/actions";
import { redirect } from "next/navigation";

export default async function Auth() {
  const result = await readUserSession();
  if (result?.data.session) {
    return redirect("/dashboard");
  } else {
    return redirect("/auth/signin");
  }
}
