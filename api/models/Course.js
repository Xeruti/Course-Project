const mongoose = require('mongoose')

const CourseSchema = new mongoose.Schema({
    title:String,
    photos: [String],
    shortDescription:String,
    description:String,
    maxPersons:Number,
    days:Number,
    startDate:Date,
    endDate:Date,
    price:Number,
    users:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}]
})

const CourseModel = mongoose.model('Course', CourseSchema)

module.exports = CourseModel