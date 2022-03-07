const mongoose = require('mongoose');
const dotenv = require('dotenv');

//tagets the dotenv file
dotenv.config({path: `./config.env`});

//.env revers to enviormntal node variables
//the config.env file can add environmental variables
//callsing process.end.<insert> will allow you to access those environmental varialbes like below
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);

//below uses mongoose to connect to database
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
.then( () => {
    console.log('connection to DB successful!')
});

//schema >> model

//schemas are used for modling data to create documents within our database.  CRUD operations
//You state the field inside an object then state the types of data they accept String, Number, ECT
const tourSchema = new mongoose.Schema({
    name: {
        //you can add another object within on of the
        //properties of the schema to add more specific options
        //required is one of those options
        //always be sure toi specify the type when doing this as you would if not using anohter object
        type: String,
        required: true,
        unique: true
    },
    rating: {
        type: Number,
        default: 4.5
    },
    price: {
        type: Number,
        //in the required option, if you pass it as an array it has 2 peramiters
        //the first is the default booleen and the second is the catch for an error
        //it accepts a string that will be represented if the error occours.
        required: [true, 'A tour must have a price']
    }
});

//mongoose.model is used to create a model out of a schema
//when using models make first letter uppercase
const Tour = mongoose.model('Tour', tourSchema);

//the model work much in the same way a function cunstructor would work
 /*
 needs test!----- code I think could make it easuer
 const makeTour = (name, rating, price) => {
    return new Tour({
        name: name,
        rating: rating,
        price: price
    })
 };
 -------
 */

 module.exports = Tour;
