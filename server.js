/* to connect to server you must have mongoShell installed
use mongosh then paste the string given by Atlas
1- mongosh "mongodb+srv://cluster0.mlejj.mongodb.net/myFirstDatabase" --apiVersion 1 --username OddSoul877

then find the db which is tours object style
2- db.tours.find()

then type "use" followed by the name of the DB
3- use natours

*/
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({path: `./config.env`});

const port = process.env.PORT || 8000;

app.listen( port, () => {
    console.log(`Hello from the server! \n Port: ${port}`);
});