"use client";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { v4 as uuid } from "uuid";
import { signUp } from "../actions";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/NavBar";
import { Input } from "@nextui-org/react";

interface input {
  [x: string]: any;
  email: string;
  password: string;
  name: string;
}

interface error {
  message: string;
  type: string;
}

export default function Signup() {
  const [inputs, setInputs] = useState<input>({
    email: "",
    password: "",
    name: "",
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    let errors: error[] = [];
    for (const key in inputs) {
      if (inputs[key] === "") {
        errors.push({ message: `${key} is required`, type: key });
      }
    }
    setError(() => errors);
    if (errors.length === 0) {
      startTransiton(() => signup());
    }
  };
  //sign user up
  async function signup() {
    const result = await signUp(inputs);
    const { error } = JSON.parse(result);
    if (error?.message) {
      setError((errors) => [
        ...errors.filter((error) => error.type != "server"),
        { type: "server", message: error.message },
      ]);
    } else {
      setError((errors) => [
        ...errors.filter((error) => error.type != "server"),
      ]);
      push("/");
    }
  }

  return (
    <>
      <NavBar loggedIn={false} />
      <main className="flex min-h-screen text-white flex-col items-center justify-center text-xl   p-12 lg:p-24 bg-gradient-to-b from-purple to-indigo-600">
        <form onSubmit={handleSubmit} className="flex flex-col flex-wrap ">
          <div className=" m-2">
            <label>
              Name:
              <Input
                className="m-2"
                type="text"
                name="name"
                classNames={{
                  errorMessage: "text-gray",
                }}
                errorMessage={
                  error.filter((err) => err.type == "name").length === 1 &&
                  error.filter((err) => err.type == "name")[0].message
                }
                value={inputs!.name || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className=" m-2">
            <label>
              Email:
              <Input
                className="m-2"
                type="email"
                name="email"
                classNames={{
                  errorMessage: "text-gray",
                }}
                errorMessage={
                  error.filter((err) => err.type == "email").length === 1 &&
                  error.filter((err) => err.type == "email")[0].message
                }
                value={inputs!.email || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className=" m-2">
            <label>
              Password:
              <Input
                className="m-2"
                type="password"
                name="password"
                classNames={{
                  errorMessage: "text-gray",
                }}
                errorMessage={
                  error.filter((err) => err.type == "password").length === 1 &&
                  error.filter((err) => err.type == "password")[0].message
                }
                value={inputs!.password || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div className="flex justify-center m-2">
            <button
              type="submit"
              className=" bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-full  "
            >
              Register
            </button>
          </div>
          <div className={isPending ? "inline-block" : `hidden`}>
            <div className="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200">
              loading...
            </div>
          </div>
          {error.map((error) => (
            <span key={uuid()} className="m-2 text-base text-center text-gray ">
              {error.type === "server" && error.message}
            </span>
          ))}
        </form>
      </main>
    </>
  );
}
