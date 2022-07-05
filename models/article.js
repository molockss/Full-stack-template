const mongoose = require('mongoose')

const articleSchema = new mongoose.Schema ( {  // we create a scheme and pass in a set of options that our article has

    title: { 
        type: String,
        required: true,
        
    },

    description: {
        type: String,
    
    },

    markdown: {

        type: String,
        required:true 
    },

    createdAt: {
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model('Article', articleSchema)  // in order to use the above scheme we have to export the scheme and pass in the name of the model and the secheme



