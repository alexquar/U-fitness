import { useState } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
export default function NewWorkoutForm() {
    const [title, setTitle] = useState('')
    const [reps,setReps]= useState('')
    const [load,setLoad]= useState('')
    const [error,setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const {dispatch} =useWorkoutsContext()
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
            setEmptyFields(json.emptyFields)
        } else {
            dispatch({type:'CREATE_WORKOUT', payload: json})
            setError(null)
            setTitle('')
            setReps('')
            setLoad('')
            setEmptyFields([])
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
             className={emptyFields.includes('title')? 'error': ''}
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
             className={emptyFields.includes('load')? 'error': ''}
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
             className={emptyFields.includes('reps')? 'error': ''}
            />
        </label>
        <button>Add Workout</button>
        {error && <div className="error">{error}</div>}
    </form>
  )
}
