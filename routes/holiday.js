const router = require('express').Router()
const HolidayModel = require('../models/holiday.model')

router.post('/addholiday', (req,res) => {
    console.log("Working")

    const HolidayModel = new HolidayModel ({
        slno : req.body.slno,
        date : req.body.date,
        day : req.body.day,
        particulars : req.body.particulars 
    })

    newHoliday.save()
    .then(() => res.send('user save successfully'))
    .catch(err => res.send('ERROR is user POST'))

})

module.exports = router

//locsalhost:1000/holiday/addholidayt