import SessionContent from "../components/SessionContent";
import  {sessionConfg}    from "../types/data";


export default function SessionList() {
  return (

    <div >
        <SessionContent config={sessionConfg}/>
    </div>
  )

}