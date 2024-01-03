"use server";

import { createSupabaseServerClient } from "../supabase/supabase";
//reading user session to check if he's signed in
import { signIn } from "@/app/auth/actions";
import { unstable_noStore as noStore } from "next/cache";
export default async function readUserSession() {
  noStore();
  try {
    const supabase: any = await createSupabaseServerClient();
    return supabase.auth.getSession();
  } catch (error: any) {
    //implement error handling
  }
}

export async function DemoAccountLogIn({ account }: { account: string }) {
  const email = account.split(" ").join("") + "@gmail.com";
  try {
    const result = await signIn({ email: email, password: account });
    return result;
  } catch (error: any) {
    throw new Error(error?.message);
  }
}
