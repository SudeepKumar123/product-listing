
const express = require('express')
const app = express()
const path = require('path')
// console.log(app)
const mongoose = require('mongoose')
const User = require('./users')
const Product = require('./product')
let bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
// console.log(jsonParser)
const cors = require('cors')
const bcrypt = require('bcryptjs')
var cookieParser = require('cookie-parser')
var session = require('express-session')
const port = process.env.PORT || 5000
// const router = express.Router()
// app.use('/',router)
app.use(cors())
app.use(cookieParser())


// MONGODB CONNECTION
mongoose.connect('mongodb+srv://sudeep:8888@cluster0.9z0re.mongodb.net/Student?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.warn('mongo connected')
  }).catch((err) => (console.log(err)))

// CREATE SESSION
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}))

const user={
  name:"sudeep",
  age:"25",
  nationality:"Indian"
}  

// app.get("/list",(req,res)=>{
//   res.sendFile(path.join(__dirname,'./dist/frontend/index.html'));
// })

// CREATE ALL API IN EXPRESS
app.put('/update-product/:id', jsonParser, function (req, res) {
  Product.updateOne({ _id: req.params.id }, { $set: { pname: req.body.pname, barcode: req.body.barcode, cdate: req.body.cdate, edate: req.body.edate, price: req.body.price, quantity: req.body.quantity } }).then((data) => {
    return res.json('Updated successfully..!!')
  }).catch((err) => (console.log(err)))
})

app.get('/list1', jsonParser, function (req, response) {
  User.find({}).then((data) => {
    response.json(data)
  }).catch((err) => (console.log(err)))
})

app.get('/product-list1', jsonParser,function (req, response) {
  Product.find({}).then((data) => {
    response.json(data)
  }).catch((err) => (console.log(err))) 
})



app.delete('/product-list/:id', jsonParser, function (req, response) {
  Product.deleteOne({ _id: req.params.id }).then((data) => {
    response.json(data)
  }).catch((err) => (console.log(err)))
})

app.get('/product-list/:id', jsonParser, function (req, res) {
  Product.find({ _id: req.params.id }).then((data) => {
    res.json(data)
  }).catch((err) => (console.log(err)))
})

app.post('/add-product', bodyParser.json(), function (req, res) {
  console.log(typeof req.body)
  const data = new Product({
    _id: mongoose.Types.ObjectId(),
    pname: req.body.pname,
    barcode: req.body.barcode,
    cdate: req.body.cdate,
    edate: req.body.edate,
    price: req.body.price,
    quantity: req.body.quantity,
  })
  data.save().then((response) => {
    res.json(response)
  }).catch((error) => {
    console.log(error)
    res.json(false)
  })
})

app.post('/register', jsonParser, function (req, res) {
  User.findOne({ name: req.body.name }).then((data) => {
    if (data) {
      return res.json('That username already exists')
    }
    User.findOne({ email: req.body.email }).then((data) => {
      if (data) {
        return res.json('That email already exists')
      }
      else {
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(req.body.password, salt, function (err, hash) {
            const data = new User({
              _id: mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              image: 'icon-3.png'
            })
            data.save().then((response) => {
              res.json(response)
            })
              .catch((err) => (console.log(err)))
          })
        });
      }
    }).catch((err) => (console.log(err)))
  }).catch((err) => (console.log(err)))
})

// app.get('/login',function(req,res){
//   // req.session.cookie
//   console.log(req.sessionID)
//   if(req.sessionID==10){
//     res.cookie('username','sudeep')
//   }else{
//     res.cookie('username','sudeep kumar')
//   }
//   res.send('hhhhhhhh')
// })

app.post('/login', jsonParser, function (req, response) {
  console.log(req)
  User.findOne({ name: req.body.login.name }).then((data) => {
    bcrypt.compare(req.body.login.password, data.password, function (err, res) {
      // console.log(res)
      if (res) {
        // req.session.user=user
        // req.session.user=10
        // req.session.user12=100
        // req.session.save()
        // req.session.destroy(function(err) {
        //   return console.log('del')
        // })
        response.json({data,session:req.session.id,rem:req.body.rem,pass:req.body.login.password})
        console.log(req.session)
        // response.status(201).cookie("username","sudeep").json({ _id: data._id, name: data.name, email: data.email, password: data.password,session:req.session.id })
        // response.header("Access-Control-Allow-Origin","*","Set-Cookie","sudeep,,")
        // response.json(req.sessionID)
        // response.cookie("username","sudeep")
        // set-cookie({header:'hhhhhh'})
        // response.json(req.session.test?req.session.test++:req.session.test=1)
        // response.json('result')
      }
      else {
        response.json(res)
      }
    })
  }).catch((err) => (console.log(err)))
})

// STATIC FILES
app.use(express.static(path.join(__dirname,'./dist/frontend')))
app.get("**",(req,res)=>{
  res.sendFile(path.join(__dirname,'./dist/frontend/index.html'));
})


app.listen(port)