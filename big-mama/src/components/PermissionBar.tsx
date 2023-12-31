"use client";

import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";
import { useOthers } from "../../liveblocks.config";
import Image from "next/image";
import { updateUserPermission } from "@/app/document/action";
import { useSearchParams } from "next/navigation";
import { useBroadcastEvent } from "../../liveblocks.config";
export default function PermissionBar() {
  const [permissionPanel, setPermissionPanel] = useState(false);
  const users = useOthers();
  const broadcast = useBroadcastEvent();

  const roomId: string = useSearchParams().get("roomid") || "";
  function handelClick() {
    setPermissionPanel(!permissionPanel);
  }

  async function permissionChange(
    event: ChangeEvent<HTMLSelectElement>,
    id: string
  ) {
    const permission: string = event.target.value;
    const result = await updateUserPermission(roomId, id, permission);

    if (result) {
      broadcast({
        type: "PermissionUpdate",
        message: `user ${id} permission have been updated`,
      });
    }
  }

  async function sendInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const id = event.currentTarget.email.value;
    const result = await updateUserPermission(roomId, id, "write")
  }

  return (
    <div className=" pr-[1em] ">
      <button
        onClick={handelClick}
        className=" text-base text-white bg-[#2f2640] rounded py-1 px-2 m-1"
      >
        Share
      </button>
      {permissionPanel ? (
        <div className="absolute text-base shadow-xl p-[2em] bg-white flex flex-col w-fit  max-h-[60vh] left-[5vw] sm:left-[20vw] lg:left-[30vw] z-20">
          <div className=" ml-auto">
            <button className="text-sm  " onClick={handelClick}>
              X
            </button>
          </div>
          <label htmlFor="invite" className=" text-sm ">
            Invite people
          </label>
          <form onSubmit={sendInvite}>
            <input
              id="invite"
              name="email"
              type="email"
              placeholder="Email address"
              className=" border-gray-600 rounded border-[1px] border-solid"
            />
            <button
              type="submit"
              className=" text-base text-white bg-[#2f2640] rounded py-1 px-2 m-1"
            >
              Send invite
            </button>
          </form>
          <div className=" overflow-y-scroll">
            {users.map((user) => {
              return (
                <div key={user.id} className="flex gap-4 mt-4">
                  <div className="flex gap-1">
                    <div className="flex relative border-4  w-[42px] h-[42px] border-white rounded-[999px]">
                      <Image
                        width={48}
                        height={48}
                        alt=""
                        className=" rounded-[999px] h-full w-full"
                        src={user.info.picture}
                      />
                    </div>
                    <div>
                      <h1>{user.info.name}</h1>
                      <span className=" text-gray-500 ">{user.id}</span>
                    </div>
                  </div>
                  <select
                    name="permission"
                    onChange={(event) => permissionChange(event, user.id)}
                    defaultValue={user.canWrite ? "write" : "read"}
                  >
                    <option value="read">can view</option>
                    <option value="write">can edit</option>
                  </select>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
