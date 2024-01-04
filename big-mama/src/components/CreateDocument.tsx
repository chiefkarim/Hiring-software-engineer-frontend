"use client";
import { createDocument } from "@/app/document/action";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { ChangeEvent, FormEvent, useState, useTransition } from "react";
import { Button, Input } from "@nextui-org/react";
import { RadioGroup, Radio } from "@nextui-org/react";

export default function CreateDocument() {
  const roomId = uuid();
  const router = useRouter();
  const [isPending, startTransiton] = useTransition();
  const [error, setError] = useState("");
  const [inputs, setInputs] = useState({ title: "", type: "" });
  //checks info before creating room
  async function createRoom(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inputs.type != "" && inputs.title != "") {
      startTransiton(async () => {
        const result = await createDocument({
          id: roomId,
          title: inputs.title,
          type: inputs.type,
        });
        if (result?.type) {
          router.push("/document/?roomid=" + roomId);
        } else if (result?.status === 403) {
          router.push("/auth/signin");
        }
      });
    } else {
      setError(() => {
        return "please enter document title and select Document Type!";
      });
    }
  }

  //updates input values
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  return (
    <form
      onSubmit={createRoom}
      className="  mt-8 p-6 rounded-md shadow-md text-white max-w-md w-full "
    >
      <h2 className="text-2xl font-semibold mb-4">Add Document</h2>
      <div className="flex  gap-2 sm:gap-4 flex-col justify-center space-x-4 ">
        <Input
          type="text"
          label="Enter project name"
          value={inputs.title || ""}
          onChange={handleChange}
          name="title"
        />
        <RadioGroup
          name="type"
          classNames={{ label: " text-white" }}
          label="type of room"
        >
          <Radio
            value="public"
            classNames={{ label: " text-gray-200" }}
            onChange={handleChange}
          >
            Public
          </Radio>
          <Radio
            value="private"
            classNames={{ label: " text-gray-200 " }}
            onChange={handleChange}
          >
            Private
          </Radio>
        </RadioGroup>

        <Button
          isLoading={isPending}
          type="submit"
          variant="solid"
          color="primary"
        >
          Add
        </Button>
      </div>
      <p className=" text-gray-200 text-center text-base">{error}</p>
    </form>
  );
}
