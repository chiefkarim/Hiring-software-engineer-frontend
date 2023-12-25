"use client";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { v4 as uuid } from "uuid";
import { signUp } from "../actions";
import { useRouter } from "next/navigation";

interface input {
  email: string;
  password: string;
}

interface error {
  message: string;
  type: string;
}

export default function Signup() {
  const [inputs, setInputs] = useState<input>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<error[] | []>([]);
  const { push } = useRouter();
  const [isPending, startTransiton] = useTransition();

  //updates input values
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  //checks for errors before submitting
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputs.email == "") {
      if (error.filter((error) => error.type == "email").length === 0) {
        setError((errors) => [
          ...errors,
          { type: "email", message: "email is required." },
        ]);
      }
    } else {
      setError((error) => {
        return [...error].filter((error) => error.type != "email");
      });
    }
    if (inputs.password == "") {
      if (error.filter((error) => error.type == "password").length === 0) {
        setError((errors) => [
          ...errors,
          { type: "password", message: "Password is required." },
        ]);
      }
    } else {
      setError((error) => {
        return [...error].filter((error) => error.type != "password");
      });
    }
    if (
      error.filter((error) => error.type == "password").length === 0 &&
      error.filter((error) => error.type == "username").length === 0
    ) {
      startTransiton(()=>signup())
    }
  };
//sign user up
async function signup(){
  const result = await signUp(inputs);
      const { error } = JSON.parse(result);
      if (error?.message) {
        setError((errors) => [
          ...errors.filter((error) => error.type != "server"),
          { type: "server", message: error.message },
        ]);
        console.log("errors", error);
      } else {
        setError((errors) => [
          ...errors.filter((error) => error.type != "server"),
        ]);
        push("/");
      }
}
  return (
    <main className="flex min-h-screen flex-col  items-center justify-center text-xl   p-12 lg:p-24 ">
      <form onSubmit={handleSubmit} className="flex flex-col flex-wrap gap-12">
        <div>
          <label>
            email:
            <input
              className=" mx-5"
              type="email"
              name="email"
              value={inputs!.email || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            password:
            <input
              className=" mx-5"
              type="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className=" bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-full  "
          >
            register
          </button>
        </div>
        <div className={isPending ? "inline-block" : `hidden`}>
          <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
            loading...
          </div>
        </div>
        {error.map((error) => (
          <span key={uuid()}>{error.message}</span>
        ))}
      </form>
    </main>
  );
}
