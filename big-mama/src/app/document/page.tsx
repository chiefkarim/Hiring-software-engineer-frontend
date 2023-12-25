import { Room } from "@/components/Room";
import { CollaborativeEditor } from "@/components/CollaborativeEditor";
import NavBar from "@/components/NavBar";


export default function Document() {
  return (
    <Room>
      <NavBar loggedIn={true}/>
      <CollaborativeEditor/>
    </Room>
  );
}
