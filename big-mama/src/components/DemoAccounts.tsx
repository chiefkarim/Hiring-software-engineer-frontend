"use client";
import { DemoAccountLogIn } from "@/lib/actions";
import { FormEvent, useState, useTransition } from "react";
import { Button } from "@nextui-org/button";
import { Select, SelectItem } from "@nextui-org/react";

export default function DemoAccounts() {
  const [isPending, startTransiton] = useTransition();
  const [account, setAccount] = useState("");
  const [error, setError] = useState("");
  function handleChnage(e: any) {
    setAccount(() => {
      return e.target.value;
    });
  }
  async function handelForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (account === "") {
      return setError("Please, chose one of the available accounts");
    }
    startTransiton(async () => {
      const result = await DemoAccountLogIn({ account });
      const { error } = JSON.parse(result);
      if (error) {
        setError(error.message);
      }
    });
  }
  return (
    <form
      onSubmit={handelForm}
      className="flex flex-wrap w-[250px] justify-center gap-4 p-4 shadow-md bg-white rounded text-base "
    >
      <Select
        id="account"
        label="select demo account"
        name="account"
        size="sm"
        onChange={handleChnage}
        className="  text-gray-900 w-full "
      >
        <SelectItem value="Jory Quispe" key="Jory Quispe">
          Jory Quispe
        </SelectItem>
        <SelectItem value="Quinn Elton" key="Quinn Elton">
          Quinn Elton
        </SelectItem>
        <SelectItem value="Emil Joyce" key="Emil Joyce">
          Emil Joyce
        </SelectItem>
      </Select>
      <div className="flex justify-center mt-3 m-2 ">
        <Button
          type="submit"
          className=" bg-blue-500 text-white "
          isLoading={isPending}
        >
          Try it now
        </Button>
      </div>

      <span className=" text-gray-800 text-sm text-center">
        {" "}
        {error ?? null}
      </span>
    </form>
  );
}
