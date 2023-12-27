"use server"
import { createSupabaseServerCient } from "@/lib/supabase/supabase";
import { redirect } from "next/navigation";
//connects to supabase and sign user up
export async function signUp(data: { email: string; password: string }) {
    const supabase = await createSupabaseServerCient()
    const result = await supabase?.auth.signUp({ email: data.email, password: data.password })
    return JSON.stringify(result)
}
//connects to supabase and sign user in
export async function signIn(data: { email: string; password: string }) {
    const supabase = await createSupabaseServerCient()
    const result = await supabase?.auth.signInWithPassword({ email: data.email, password: data.password })
    return JSON.stringify(result)
} 
//connects to supabase and sign user out
export async function signOut() {
    const supabase = await createSupabaseServerCient()
    await supabase?.auth.signOut()
    redirect("/")
}