const router = require('express').Router()
const TeachingModel = require('../models/teaching.model')

// For Adding Faculities Details

router.post('/addteachingdiary', (req,res) => {
    console.log("Inserted")

    const newTeaching = new TeachingModel({
        semester: req.body.semester,
        section: req.body.section,
        term: req.body.term,
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
    TeachingModel.findOne({username: req.params.username})
        .then(data => res.send(data))
        .catch(err => res.send(err))
})

module.exports = router