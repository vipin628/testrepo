const express  = require('express');
const web = require('./routes/web.js')
const session = require('express-session')
const flash = require('connect-flash')

const {pool} = require('./db/connectdb.js')
// const {createDoc} = require('./models/user.js')
const { join } = require('path')

// import express from 'express'
const app = express()
const port = '3000'
const DATABASE_URL = "mongodb://0.0.0.0:27017"

// connectDB(DATABASE_URL)

//session implements

app.use(session({
    secret:'iamkey',
    resave:false,
    saveUninitialized:true,
    cookie: { maxAge:100000000}
}))
app.use(flash())


app.use(express.urlencoded({extended:false})) 
// app.set('views','./views')

//create and save document

// createDoc();

app.set('view engine','ejs')

//statis files

app.use('/assets',express.static(join(process.cwd() ,'public')))



// import web from './routes/web.js'
app.use('/',web)



app.listen(port,()=>{
    console.log(`server running at ${port}`)
})