"use client";
import { signOut } from "@/app/auth/actions";
import { Button } from "@nextui-org/react";

export default function Logout() {
  return (
    <form action={signOut}>
      <Button
        type="submit"
        variant="ghost"
        className=" text-sm  leading-none  text-white  hover:border-transparent hover:text-purple hover:bg-white "
      >
        Logout
      </Button>
    </form>
  );
}
