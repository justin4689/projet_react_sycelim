import UserContent from "../components/UserContent";
import  {userConfig} from "./UserCreatePage";


export default function UserList() {
  return (

    <div >
        <UserContent config={userConfig}/>
    </div>
  )

}