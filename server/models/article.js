const mongoose= require('mongoose');

const articleSchema = mongoose.Schema(
    {
        title : {
            type: String,
            maxLength : [ 30 , "Title Max(30) Character"],
            default : "Untitled"
        },
        content : {
            type: String,
            default: ""
        },
        image : {
            type: String,
            default :"https://i.pinimg.com/originals/15/51/69/1551696c66b26f200c3ba94641316780.jpg"
        },
        tags : [{
            type: String,
            required: true
        }],
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref : "User"
        }
    },
    {
        timestamps : true
    }
)

const articles = mongoose.model( 'article' , articleSchema );
module.exports = articles;