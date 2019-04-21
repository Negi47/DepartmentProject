const router = require('express').Router()
const UserModel = require('../models/user.model')


router.get('/', (req, res) => {
    console.log("in User Get method")

    UserModel.find()
        .then(data => res.send(data))
        .catch(err => console.log(err))
})

// For singup

//localhost:1000/user/adduser
router.post('/adduser', (req, res) => {
    console.log(`email: ${req.body.email}, password: ${req.body.password}`)

    const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })


    newUser.save()
        .then(() => res.send(true))
        .catch(err => res.send(false))
})


router.post('/searchuser', (req, res) => {

    UserModel.findOne({email: req.body.email, password: req.body.password})
        .then(data => {
            res.send(data)
        })
        .catch(err => console.log('user search err', err))

})



module.exports = router