import { Link } from "react-router-dom"
import { useLogout } from "../hooks/useLogout"
import { useAuthContext } from "../hooks/useAuthContext"
export default function Navbar() {
  const {user} = useAuthContext()
  const {logout}=useLogout()
  return (
   <header>
    <div className="container">
    <Link to='/'> <h1> U Fitness </h1> </Link>
    <nav>
  {!user &&
    <div>
    <Link to='/login'> login </Link>
    <Link to='/signup'>  signup </Link>
    </div>
  }
  { user &&
    <div>
<button className="btn" onClick={logout}> Logout </button>
    </div>
  }
    </nav>
    </div>
   </header>
  )
}
