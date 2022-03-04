const express = require('express');
const {getAllUsers, createUser, getUser, updateUser, deleteUser} = require(`./../controllers/userController`);

const router = express.Router();

//.param is a middleware function so naturally it has next as the third param
//the fourth para is the value being passed through
//in the example below, the parameter of 'id' will be passed through the middleware
//represented by val. THis is useful to have specific middleware functions for different url routes
router.param('id', (req, res, next, val) => {

    console.log(`Tour id:${val}`);
    next();

});

router
.route(`/`)
.get(getAllUsers)
.post(createUser);

router
.route(`/:id`)
.get(getUser)
.patch(updateUser)
.delete(deleteUser);

module.exports = router;
//app.use(`${url}/users`, userRouter);