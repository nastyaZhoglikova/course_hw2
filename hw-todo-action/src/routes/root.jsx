import Create from '../components/Create.jsx'
import Edit from '../components/Edit.jsx'
import '../App.css'

function Root() {
  // Тут має бути нормальна робота з параметрами через useParams чи useLocation
  // але там іх не бачить роутер, мабуть бо сетятся неправильно
  const todoId = location.search?.match('$\\/=[2-9]|\\d{2,}')?.[0]

  if (todoId) return <Edit todoId={todoId}/>
  else return <Create />

}

export default Root
