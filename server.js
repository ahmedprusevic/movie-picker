//Require the packege express

const express = require('express');

//Require the connectDB function from config/db (initialize after you run express!!)
const connectDB = require('./config/db');

//Run the required package
const app = express();


//Connect database
connectDB();

// Initialize middleware insead installing bodyparser
app.use(express.json({ extended: false }));


//On get request send the following!
app.get('/', (req,res) => res.send('API Running'));

// Defining routes
//e.g This way in users.js file get request to "/" is /api/users
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

//Serve the app on the port or 5000, when deployed on Heroku app will look for process.env.PORT
const PORT = process.env.PORT || 5000;

//App is served on one of the ports

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));