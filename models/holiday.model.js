const moongose = require('mongoose')
const {Schema} = moongose

const HolidaySchema = new Schema ({
    
    slno : {
        type : String,
        require : true
    },
    date : {
        type : Date,
        require : true
    },
    day: {
        type : String,
        require : true
    },
    particulars : {
        type : String,
        require : true
    }

})

module.exports = moongose.model('holiday',HolidaySchema)