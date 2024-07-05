import Create from '../components/Create.jsx'
import Edit from '../components/Edit.jsx'
import '../App.css'
// import {
//   useLocation,
//   useNavigate
// } from "react-router-dom";

function Root() {
  // Тут має бути нормальна робота з параметрами через useParams чи useLocation
  // але там іх не бачить роутер, мабуть бо сетятся неправильно
  // console.log(location.pathname === '/edit')
  const todoId = location.search?.match('$\\/=[2-9]|\\d{2,}')?.[0]
  // console.log(location.pathname.replace('/', ''))
  console.log(todoId)

  // return (
  //   <Edit todoId={todoId} />
  //   // <Create />
  // )

  if (todoId) return <Edit todoId={todoId}/>
  else return <Create />

}

export default Root
