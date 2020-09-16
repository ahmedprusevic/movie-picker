//Connecting data base with app

//Require mongoose
const mongoose = require('mongoose');
//Require config (config is a package that alows us to create global variables check config/default.json)
const config = require('config');
//storing db uri from default.json folder in a variable
const db = config.get('mongoURI');

// connecting db with our app, mongooose.connect method will return you a promise that's way you need async --> await you could use also .then method
//  whenever using async await you want to put them in a try catch block to check for any errors.
const connectDB = async () => {
    try{
//try to connect to the data base using mongoURI link from default.json , you got this link from mongoDB atlas where you created cluster
//after starting a server you've got warning to pass in useNewUrlParser as true and useUnifiedTopology as true.
    await mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
    console.log("Data base connected.");
    } catch(err){
        console.error(err.message);
        //Exit the application with failure if the db is not connected
        process.exit(1);
    }
}

// export the connectDB function
module.exports = connectDB;