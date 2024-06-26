const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')
const getWorkouts = async (req, res) => {

  const user_id = req.user._id
    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
  
    res.status(200).json(workouts)
  }

const getWorkout = async(req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({error:"No such workout"})
    }

    const workout = await Workout.findById(id)
    if(!workout){
       return res.status(404).json({error:"No such workout"})
    }
       
    res.status(200).json(workout)
    
}

const createWorkout = async (req,res) => {
    const {title,load, reps} = req.body
    let emptyFields = []

    if (!title) {
      emptyFields.push('title')
    }
    if (!load) {
      emptyFields.push('load')
    }
    if (!reps) {
      emptyFields.push('reps')
    }
    if (isNaN(reps) || isNaN(load)) {
      return res.status(400).json({ error: 'Reps and weight must be numbers...'})
    }
    if (emptyFields.length > 0) {
      return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    try{
      const user_id = req.user._id
       const workout = await Workout.create({title, load, reps, user_id})
      res.status(200).json(workout)
    } catch (err){
      res.status(400).json({error : err.message})
    }
}

const deleteWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndDelete({_id: id})

  if(!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

const updateWorkout = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such workout'})
  }

  const workout = await Workout.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!workout) {
    return res.status(400).json({error: 'No such workout'})
  }

  res.status(200).json(workout)
}

module.exports = {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
}