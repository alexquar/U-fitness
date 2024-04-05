import { useState } from "react"

export default function NewWorkoutForm() {
    const [title, setTitle] = useState('')
    const [reps,setReps]= useState('')
    const [load,setLoad]= useState('')
    const [error,setError] = useState(null)
    const handleSubmit = async(e)=>{
            e.preventDefault()
        const workout = {
            title,
            load,
            reps
        }
        const res = await fetch('/api/workouts', {
            method:'POST',
            body : JSON.stringify(workout),
            headers : {
                'Content-Type':'application/json'
            }
        })

        const json = await res.json()
        if(!res.ok){
            setError(json.error)
        } else {
            setError(null)
            setTitle('')
            setReps('')
            setLoad('')
        }
    }
  return (
    <form className="create" onSubmit={handleSubmit}>
        <h3>
            Add a new Workout...
        </h3>
        <label >
            <span>
            Exercise Title:
            </span>
            <input
             type="text" 
             onChange={(e)=>setTitle(e.target.value)}
             value={title}
             />
        </label>
        <label >
            <span>
            Load (in kg):
            </span>
            <input 
            type="text" 
            onChange={(e)=>setLoad(e.target.value)}
             value={load}
            />
        </label>
        <label >
            <span>
            Reps:
            </span>
            <input 
            type="text"
            onChange={(e)=>setReps(e.target.value)}
             value={reps} 
            />
        </label>
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}
