"use server"

import { createSupabaseServerCient } from "../supabase/supabase"
//reading user session to check if he's signed in
import { signIn } from "@/app/auth/actions"

export default async function readUserSession() {
    
    try {
        const supabase = await createSupabaseServerCient()
        return supabase?.auth.getSession()
    } catch (error: any) {
        console.error(error?.message)
    }
}

export async function DemoAccountLogIn({account}:{account:string}){
    const email = account.split(" ").join("")  + "@gmail.com";
    console.info("credentials",email,account)
    const result =await signIn({email:email,password:account})
    return JSON.stringify(result)
}