import { useEffect, useState } from "react"
import WorkoutDetails from "../components/WorkoutDetails"

export default function Home() {
    const [workouts, setWorkouts]= useState(null)

    useEffect(()=>{

    const fetchWorkouts = async ()=>{
        const res = await fetch('/api/workouts/')
        const json = await res.json()
        if(res.ok){
            setWorkouts(json)
        }
    } 

    fetchWorkouts()
    },[])


  return (
    <div className="home">
        <div className="workouts">
      {workouts && workouts.map(workout => (
        <WorkoutDetails key={workout._id} workout={workout}>

        </WorkoutDetails>
      ))}
      </div>
    </div>
  )
}
