const express = require("express")
const bodyParser = require('body-parser');
const fs = require("fs");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex");
const register = require('./Controllers/register');
const signin = require('./Controllers/signin');
const image = require('./Controllers/image');
const id = require('./Controllers/id');
const { setUseProxies } = require("immer");

const db = knex({
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'postgres',
      password: 'Theowner06162012',
      database: 'smart-brain'
    },
    pool: { min: 0, max: 7 }
  })

//   db.select('*').from('users')
//   .then (data => {
//       console.log(data);
//   });
  
const app = express();
app.use (bodyParser.json());   
app.use(cors()); 

const database = {
    users:[
        {
            id: '123',
            name: 'Wilson',
            email: 'wilson@gmail.com',
            password: 'kiracomi',
            entries: 0,
            joined: new Date()

        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: '0',
            joined: new Date()

        }
    ],
    login: [
        {
          id:'987',
          hash:'',
          email: 'john@gmail.com'
        }
    ]  
}

app.get('/', (req,res) => {res.send('it is working!');})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', (req, res )=>{register.handleRegister(req, res, db, bcrypt)})

app.get('/profile/:id', (req,res) => {id.handleId(req,req,db)})

app.put('/image',(req,res) => {image.handleImage(req,res,db)})

app.post('/imageurl', (req,res) => {image.handleApiCall(req,res,)})

app.listen(process.env.PORT || 3000, () =>{console.log(`app is running on ${process.env.PORT}`)});

/*
/ -->res = this is working
/signin -->> post = success/fail
/register --> post = user
/profile/:userID ---> GET = user
/image --> Put  = user
*/