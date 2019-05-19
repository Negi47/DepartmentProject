const router = require('express').Router()
const TeachingModel = require('../models/teaching.model')

// For Adding Faculities Details

router.post('/addteachingdiary', (req,res) => {
    console.log("Inserted")

    const newTeaching = new TeachingModel({
        semester: req.body.semester,
        section: req.body.section,
        fromterm: req.body.fromterm,
        toterm: req.body.toterm,
        subject: req.body.subject,
        credits: req.body.credits,
        facultyname: req.body.facultyname,
        totalhours : req.body.totalhours,
        days: req.body.days,
        username: req.body.username
    })

    newTeaching.save()
    .then(() => res.send(true))
    .catch(err => res.send(false))

})


router.get('/getTeachingDetails/:username', (req, res) => {
    console.log('loggedin username: ', req.params.username)
    TeachingModel.find({username: req.params.username}).sort({_id: -1}).limit(1)
        .then(data => {
            console.log('data from getTeachingDetails: ', data)
            res.send(data)
        })
        .catch(err => res.send(err))
})

module.exports = router