import { Room } from "@/components/Room";
import { CollaborativeEditor } from "../components/CollaborativeEditor";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Room>
        <CollaborativeEditor />
      </Room>
    </main>
  );
}
