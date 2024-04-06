import { Link } from "react-router-dom"
export default function Navbar() {
  return (
   <header>
    <div className="container">
    <Link to='/'> <h1> U Fitness </h1> </Link>
    <nav>
    <div>
    <Link to='/login'> login </Link>
    <Link to='/signup'>  signup </Link>
    </div>
    <div>
<button className="btn"> Logout </button>
    </div>
    </nav>
    </div>
   </header>
  )
}
