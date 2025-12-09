import UserContent from "../components/UserContent";
import  {userConfig} from "../types/data";


export default function UserList() {
  return (

    <div >
        <UserContent config={userConfig}/>
    </div>
  )

}