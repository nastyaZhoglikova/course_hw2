import EditComponent from '../components/Edit.jsx'
import '../App.css'
import {useLocation} from 'react-router-dom'

function Edit() {
  const location = useLocation()
  console.log(location)
  return (
    <>
      <EditComponent />
    </>
  )
}

export default Edit
