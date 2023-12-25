"use client"
import { signOut } from "@/app/auth/actions";
export default function Logout() {
 
  return (<form action={signOut}>

            <div>
    <button
    type="submit"
      className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-purple hover:bg-white mt-4 lg:mt-0"
    >
      Logout
    </button>
    </div>
  </form>
  );
}
