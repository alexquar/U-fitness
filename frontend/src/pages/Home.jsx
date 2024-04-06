import { useEffect } from "react"
import { useWorkoutsContext } from "../hooks/useWorkoutsContext"
import WorkoutDetails from "../components/WorkoutDetails"
import NewWorkoutForm from "../components/NewWorkoutForm"
import { useAuthContext } from "../hooks/useAuthContext"
export default function Home() {
const {workouts, dispatch} = useWorkoutsContext()
const {user} = useAuthContext()
useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch('/api/workouts',{
        headers:{
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
    if(user){
    fetchWorkouts()
    }
  }, [dispatch,user])


  return (
    <div className="home">
        <div className="workouts">
      {workouts && workouts.map(workout => (
        <WorkoutDetails key={workout._id} workout={workout}/>
      ))}
    {workouts && !workouts.length && <div className="error">There are no workouts to display...</div>}
      </div>
      <NewWorkoutForm />
    </div>
  )
}
