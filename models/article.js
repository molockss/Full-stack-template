// we created this file to store all of our article data

const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema ( {  // we create a scheme and pass in a set of options that our article has

    title: { 
        type: String,
        required: true,   // these are all the options our article has
        
    },

    description: {
        type: String,  // not required as we dont always need a description
    
    },

    markdown: {

        type: String,
        required:true 
    },

    createdAt: {
        type: Date,
        default: Date.now  // takes a function and calls it everytime we  created a new article
    }

})

module.exports = mongoose.model('Article', articleSchema)  // in order to use the above scheme we have to export the scheme and pass in the name of the model and the secheme



