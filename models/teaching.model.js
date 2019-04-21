const moongose = require('mongoose')
const {Schema} = moongose

const TeachingSchema =  new Schema ({

    semester: {
        type: String,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    term: {
        type: String,
        required: true
    },
    credits: {
        type: String,
        required: true
    },
    facultyname: {
        type: String,
        required: true
    },
    totalhours: {
        type: String,
        required: true
    },
    days: {
        mon: [String],
        tue: [String],
        wed: [String],
        thu: [String],
        fri: [String],
        sat: [String]
    },
    username: {
        type:String,
        required: true
    }

})

module.exports = moongose.model('teaching',TeachingSchema)