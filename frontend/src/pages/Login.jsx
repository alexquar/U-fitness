import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
    const {error,isPending,login}= useLogin()
  const handleSubmit = async (e) => {
    e.preventDefault()
    login(email,password)
  }

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Login</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />
     {isPending && <button disabled>Loading...</button>}
    {!isPending && <button>Login</button>}
    {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login