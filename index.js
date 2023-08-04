const express = require('express');
const workoutRoutes = require('./routes/workoutRoutes');
const userRoutes = require('./routes/userRoutes')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_URI);

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

app.listen(3000, () => {
    console.log('App listened on PORT 3000')
})