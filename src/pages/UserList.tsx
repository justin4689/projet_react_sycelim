import UserContent from "@/components/UserContent";
import { userConfig } from "@/lib/types/data";

export default function UserList() {
  return (
    <div>
      <UserContent config={userConfig} />
    </div>
  );
}
