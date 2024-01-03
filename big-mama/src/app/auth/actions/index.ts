"use server";
import { createSupabaseServerCient } from "@/lib/supabase/supabase";
import { redirect } from "next/navigation";
//connects to supabase and sign user up
export async function signUp(data: {
  email: string;
  password: string;
  name: string;
}) {
  const supabase = await createSupabaseServerCient();
  const result = await supabase?.auth.signUp({
    email: data.email,
    password: data.password,
  });
  // inserting user data
  //choosing random image from liveblocks
  const image = Math.floor(Math.random() * 10) % 27;
  try {
    const insert = await supabase
      ?.from("users")
      .insert({
        name: data.name,
        avatar: `https://liveblocks.io/avatars/avatar-${image}.png`,
      })
      .single();
  } catch (error) {
    console.error(error);
  }
  return JSON.stringify(result);
}
//connects to supabase and sign user in
export async function signIn(data: { email: string; password: string }) {
  const supabase = await createSupabaseServerCient();
  const result = await supabase?.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });
  return JSON.stringify(result);
}
//connects to supabase and sign user out
export async function signOut() {
  const supabase = await createSupabaseServerCient();
  await supabase?.auth.signOut();
  redirect("/");
}
