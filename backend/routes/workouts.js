const express = require('express')
const router = express.Router()
const Workout = require('../models/workoutModel')
router.get('/', (req, res) => {
    res.json({mssg: 'GET all workouts'})
  })
  

  router.get('/:id', (req, res) => {
    res.json({mssg: 'GET a single workout'})
  })
  

  router.post('/', async (req, res) => {
    const {title,load, reps} = req.body
    try{
      const workout = await Workout.create({title, load, reps})
      res.status(200).json(workout)
    } catch (err){
      res.status(400).json({error : err.message})
    }
  })
  

  router.delete('/:id', (req, res) => {
    res.json({mssg: 'DELETE a workout'})
  })
  
  router.patch('/:id', (req, res) => {
    res.json({mssg: 'UPDATE a workout'})
  })

module.exports = router