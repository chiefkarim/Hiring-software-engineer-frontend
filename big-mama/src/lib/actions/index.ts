"use server"

import { createSupabaseServerCient } from "../supabase/supabase"
//reading user session to check if he's signed in
export default async function readUserSession() {
    const supabase = await createSupabaseServerCient()

    return supabase?.auth.getSession()
}