const express = require('express')
const articleRouter = require ('./routes/articles')
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

app.use ('/articles', articleRouter)  // we want the articles to appear after the / then everything else


app.get ('/', (req,res)=> {
    const articles = [ {
        title : 'Test Article',
        createdAt: new Date(),
        description: 'test decription'
    }

    ]
    res.render ('articles/index', {articles: articles}) // we use render as its going to access the views folder and the index.ejs inside
    // we can then pass in whatever we want so "articles" is located in ejs and we're passing an object
})



app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())





//PORT = 8000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})