const fs = require('fs');

const fileWriteLocation = `${__dirname}/../dev-data/data/tours-simple.json`
const tours = JSON.parse(fs.readFileSync(fileWriteLocation));

//-----------MiDDLEWARE-----------------

//Middleware that validates ID
exports.checkID = (req, res, next, val) => {
    if (val > tours.length) {
        return res.status(404).json({
            status: 'fail',
            message: `invalid id - check "tourController.js" - value passed as id: ${val}`
            }
        )
    };
        next();
}

exports.checkBody = (req, res, next) => {
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: 'fail',
            message: `an error has occoured. The price or body of this tour are not valid or do not exist!`,
        })
    };
    next();
};
//--------MAIN HANDLERS-------------
exports.getAllTours = (req, res) => {

    //.status() is not required for functionality but is goo practice
    //for the first attribute of the json object you bust include "success, fail, or error" as the first.
    //the second will be the data
    res.status(200).json({
        success: 'success',
        //OPTIONAL another practice is to provide the number of results in the data like the attribute shown below
        results: tours.length,
        data:{
            //can also be written as "tours: tours" the single "tours" is stated as a shorthand n available through ES6.
            tours
        }
    });
};


//

// req.params refers to the variables in the url (the pieces of the url with ":" before them like ":id" shown below.) 
//Any value can be put in these params such as :x or :y
//if these parameters are available in the url, you must fill all of them or you will hit an error
// to get around this you may add ? behind the peramiter to make it an optional one such as ":id?"
//GET
exports.getTour = (req, res) => {

        //this is a workaround to make sure something is converted to a Number type.
        //we are doing this to assure the id is a Number so that when we use .find it can accuratly parse
        const id = req.params.id * 1;

        if (id > tours.length) return res.status(404).json({
            status: 'fail',
            message: "invalid id"
        });
        //.find is an array method refer to documentation below for information
        //MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find 
        //it compares the el in the callback and returns what it is qual too from the array it is parsing.
        //el.id look in the req.params for a match

        const tour = tours.find(el => el.id === id);
        console.log(req.params);
    
        res.status(200).json({
           status: "success",
           data: {
           tour
       }
    });
    
};
//POST

exports.createTour = (req, res) => {
    console.log(req.body);

    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);

    tours.push(newTour);
    fs.writeFile(fileWriteLocation, JSON.stringify(tours), err => {
        if (err) return console.log(`An error has occoured while trying to write a file to the databse. check app.js \n ERROR:${err}`);

        //201 is for creations
        res.status(201).json({
            status: "success",
            data: {
                tours: newTour
            }
        });
    });
};

//PATCH

exports.updateTour = (req, res) => {

    const id = req.params.id * 1;

    if (id > tours.length) return res.status(404).json({
        status: 'fail',
        message: "invalid id"
    });

    console.log("patch successful");

    res.status(201).json({
        status: 'success',
        data: {
            tour: 'updated tour here'
        }
    });

};

exports.deleteTour = (req, res) => {

    const id = req.params.id * 1;

    if (id > tours.length) return res.status(404).json({
        status: 'fail',
        message: "invalid id"
    });

    console.log("patch successful");

    res.status(204).json({
        status: 'success',
        data: null
    });

};
