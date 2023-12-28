"use client";
import { DemoAccountLogIn } from "@/lib/actions";
import { FormEvent, useState, useTransition } from "react";

export default function DemoAccounts() {
  const [isPending, startTransiton] = useTransition();
  const [account, setAccount] = useState("");

  function handleChnage(e: any) {
    setAccount(() => {
      return e.target.value;
    });
  }
  async function handelForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    startTransiton(async () => {
      const result = await DemoAccountLogIn({ account });
      const { error } = JSON.parse(result);

      if (error) {
        console.log("Error", error);
      }
    });
  }
  return (
    <form onSubmit={handelForm}>
      <select
        id="account"
        name="account"
        onChange={handleChnage}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="Jory Quispe">Jory Quispe</option>
        <option value="Quinn Elton">Quinn Elton</option>
        <option value="Emil Joyce">Emil Joyce</option>
      </select>
      <div className="flex justify-center">
        <button
          type="submit"
          className=" bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-full  "
        >
          Try it now
        </button>
      </div>
      <div className={isPending ? "inline-block" : `hidden`}>
        <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
          loading...
        </div>
      </div>
    </form>
  );
}
