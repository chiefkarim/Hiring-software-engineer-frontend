"use server";
import {
  createBrowserClient,
  createServerClient,
  type CookieOptions,
} from "@supabase/ssr";
import { error } from "console";
import { cookies } from "next/headers";

//creates connection to supabase from the browser(frontend)
export async function createSupabaseFrontendClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      return createBrowserClient(url, key);
    } catch (error) {
      console.error(error);
    }
  } else if (!url) {
    throw error(
      "missing supabase url,please add NEXT_PUBLIC_SUPABASE_URL variable to .env file. please, refer to the README.md # Authentication section",
    );
  } else if (!key) {
    throw error(
      "missing supabase url,please add NEXT_PUBLIC_SUPABASE_ANON_KEY variable to .env file. please, refer to the README.md # Authentication section",
    );
  }
}
//create connection to supabase from the server
export async function createSupabaseServerCient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (url && key) {
    try {
      return createServerClient(url, key, {
        cookies: {
          get(name) {
            //return cookie with the name "name here"
            return cookies().get(name)?.value;
          },
          set(name, value, options: CookieOptions) {
            //set a new cookie called "name here" with value "value here", and options are optional
            cookies().set(name, value, options);
          },
          remove(name, options: CookieOptions) {
            //remove a cookie called "name here". Options are also optional
            cookies().set(name, "", options);
          },
        },
      });
    } catch (error) {
      console.error(error);
    }
  } else if (!url) {
    throw error(
      "missing supabase url,please add NEXT_PUBLIC_SUPABASE_URL variable to .env file. please, refer to the README.md # Authentication section",
    );
  } else if (!key) {
    throw error(
      "missing supabase url,please add NEXT_PUBLIC_SUPABASE_ANON_KEY variable to .env file. please, refer to the README.md # Authentication section",
    );
  }
}
