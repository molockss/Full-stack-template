// we created this file to store all of our article data

const mongoose = require('mongoose')
const {marked} = require('marked') // We get an error if we don't put it as an object
const slugify = require ('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require ('jsdom') // we only want the jsdom portion so we put it in brackets for that reason
const dompurify = createDomPurify( new JSDOM().window) //alows our dompurify to create html and purify it using jsdom window object

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
    },

    slug: {

        type: String,
        required: true,
        unique: true, // helps us make sure our slug is different. u cant have to url with the same name showing different pages
    },

    sanitizedHtml: {
        type: String,
        required: true
    },

})

articleSchema.pre('validate', function(next) { //anytime we save delete, etc this function is going to run and create our slug from the title

    if(this.title){
        this.slug = slugify(this.title, { lower: true, strict: true})
    } // strict is going to force our slug to get rid of any long characters that dont fit in the url, lower just turns it into lowercase

    if (this.markdown){
        this.sanitizedHtml = dompurify.sanitize(marked(this.markdown)) // the marked(this.markedown) converts the markdown to html and everything else just sanitises it
    }

next() // we're calling next each time

})

module.exports = mongoose.model('Article', articleSchema)  // in order to use the above scheme we have to export the scheme and pass in the name of the model and the secheme



