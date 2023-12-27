import { v4 as uuid } from "uuid";

export default function DisplayDocuments({ rooms }: any) {
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
  return formatedRooms.map((room: any) => {
    return (
      <div key={uuid()} className="bg-gray-100 bg-opacity-30 p-4">
        <a href={`/document/?roomid=${room.id}`}>
          <h1>{room?.metadata?.title}</h1>
          <div className="flex justify-end">
            <span>{room.createdAt}</span>
          </div>
        </a>
      </div>
    );
  });
}
