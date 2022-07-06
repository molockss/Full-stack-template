const express = require('express')
const articleRouter = require ('./routes/articles')
const Article = require ('./models/article') // we're passing in our stored articles in our model file
const mongoose = require ('mongoose')
const app = express()
const cors = require('cors')

require('dotenv').config()
dbstring = 'mongodb+srv://molocks:Atwc3359@cluster0.ieiq2.mongodb.net/?retryWrites=true&w=majority'


mongoose.connect(dbstring, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



app.set ('view engine', 'ejs' )  // view engine converts ejs code to html

app.use (express.urlencoded({ extended: false})) // allows use to acces the form data from our article route




app.get ('/', async (req,res)=> {

    const articles = await Article.find().sort({ // we're now passing in all our articles into the home page based on when we created them
        createdAt: 'descending'})
           res.render('articles/index', {articles: articles})
    })
  // we use render as its going to access the views folder and the index.ejs inside
    // we can then pass in whatever we want so "articles" is located in ejs and we're passing an object



app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())


app.use ('/articles', articleRouter)  // we want the articles to appear after the / then everything else


//PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})