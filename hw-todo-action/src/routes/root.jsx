import Create from '../components/Create.jsx'
import '../App.css'
import {
  useLocation
} from "react-router-dom";

function Root() {
  const location = useLocation()
  console.log(location)
  return (
    <>
      <Create />
    </>
  )
}

export default Root
