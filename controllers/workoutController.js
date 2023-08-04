const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');
const express = require('express')

// CREATE new workout
const createWorkout = async(req, res) => {
    const { title, reps, sets, load } = req.body;
    try {
        user = req.user._id;
        const workout = await Workout.create({ title, load, reps, sets, user });
        console.log(req.body.user)
        res.status(200).json(workout);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

// GET all workouts
const getWorkouts = async(req, res) => {
    const user = req.user._id;

    const workouts = await Workout.find({ user: user }).sort({ createdAt: -1 });
    res.status(200).json(workouts);
}

// GET workout
const getWorkout = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout Not Found!" })
    }

    const workout = await Workout.findById(id);
    if (!workout) {
        return res.status(400).json({ error: 'Workout Not Found!' })
    }
    res.status(200).json(workout)
}

// DELETE workout
const deleteWorkout = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout Not Found!" });
    }
    const workout = await Workout.findOneAndDelete({ _id: id });
    if (!workout) {
        return res.status(400).json({ error: 'Workout Not Found!' });
    }
    res.status(200).json(workout);
}

// UPDATE a workout
const updateWorkout = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Workout Not Found!" })
    }

    const workout = await Workout.findOneAndUpdate({ _id: id }, {...req.body })
    if (!workout) {
        return res.status(400).json({ error: 'Workout Not Found!' });
    }
    res.status(200).json(workout);
}

module.exports = {
    createWorkout,
    getWorkouts,
    getWorkout,
    deleteWorkout,
    updateWorkout
}