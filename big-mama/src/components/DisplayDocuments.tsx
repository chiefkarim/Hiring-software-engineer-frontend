"use client";
import { deleteDocument } from "@/app/document/action";
import { Button, CardFooter, CardHeader, Divider } from "@nextui-org/react";
import { useState, useTransition } from "react";
import { v4 as uuid } from "uuid";
import { Card, CardBody } from "@nextui-org/react";

export default function DisplayDocuments({ rooms }: any) {
  const [isPending, startTransiton] = useTransition();
  const [removing, setRemoving] = useState("");
  //formatting the date before displaying
  const formatedRooms = rooms.map((room: any) => {
    return {
      ...room,
      createdAt: new Date(room.createdAt).toLocaleDateString("en-us", {
        hour: "numeric",
        minute: "numeric",
      }),
    };
  });

  //handel room delete
  async function handleDelete(id: string) {
    setRemoving(() => {
      return id;
    });
    startTransiton(async () => {
      const result: any = await deleteDocument(id);
      if (result) {
      } else if (result?.error) {
      }
    });
  }
  return formatedRooms.map((room: any) => {
    return (
      <Card key={uuid()}>
        <CardHeader>
          <a href={`/document/?roomid=${room.id}`}>
            <h1>{room?.metadata?.title}</h1>
            <div className="flex  text-sm opacity-80">
              <small>{room.metadata.type}</small>
            </div>
            <div className="flex justify-end text-base">
              <small>{room.createdAt}</small>
            </div>
          </a>
        </CardHeader>
        <CardBody>
          <Button
            isLoading={isPending && room.id == removing ? isPending : false}
            variant="light"
            color="danger"
            onClick={() => handleDelete(room.id)}
          >
            Delete
          </Button>
        </CardBody>
      </Card>
    );
  });
}
