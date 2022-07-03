const express = require('express')
const articleRouter = require ('./routes/articles')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()
const PORT = 5000

let db,
    dbConnectionString = process.env.DB_STRING,
    dbName = 'fullstack',
    collection

MongoClient.connect(dbConnectionString)
    .then(client => {
        console.log(`Connected to Database`)
        db = client.db(dbName)
        collection = db.collection('blog ')
    })

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





//PORT = 5000
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port`)
})