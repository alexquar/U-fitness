import { Link } from "react-router-dom"
export default function Navbar() {
  return (
   <header>
    <div className="container">
    <Link to='/'> <h1> U Fitness </h1> </Link>
    </div>
   </header>
  )
}