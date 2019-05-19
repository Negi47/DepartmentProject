const moongose = require('mongoose')
const {Schema} = moongose

const DepartmentSchema = new Schema ({
    
    slno : {
        type : String,
        require : true
    },

})

module.exports = moongose.model('department',DepartmentSchema)