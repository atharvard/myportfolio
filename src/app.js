
// aquiring and declaring in functiom
const express = require("express");
// aquire path  module
const path = require("path");
const hbs = require("hbs");
const nodemailer = require('nodemailer');
const app = express()

// body-praser  to parse the data from the contact form which is create
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))




// Declaring port 
const port = process.env.Port || 5000;


// static path declaration
const static_path = path.join(__dirname, "../public");

// path for template engine
const template_path = path.join(__dirname,"../templates/views");

// path for partials
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.static(static_path));
app.use(express.urlencoded({ extended: true }));


// template engine setting
app.set("view engine", "hbs");


app.set("views", template_path);

// Registering Partails paath
hbs.registerPartials(partials_path);



app.get( "/", (req, res)=> {
    res.render("home")
});

app.get( "/home", (req, res)=> {
    res.render("home")
});

app.get( "/about", (req, res)=> {
    res.render("about")
});

app.get( "/experience", (req, res)=> {
    res.render("experience")
});

app.get( "/project", (req, res)=> {
    res.render("project")
});

app.get( "/contact", (req, res)=> {
    res.render("contact")
});






// ContactMe at mail

app.post("/contactme", (req, res) => {
  const person = req.body.fullname;
  const emailid = req.body.email;
  const messagep = req.body.message;
  const phoneno = req.body.mobileno;
  const output = `
  <p>Hello Atharva,<p>
  <p>You have a new contact request.</p>
  <h3>Contact Details</h3>
  <ul>  
      <li>Name: ${req.body.fullname}</li>
      <li>Phone: ${req.body.mobileno}</li>
      <li>Email: ${req.body.email}</li>
  </ul>
  <h3>Message:</h3>
  <p>${req.body.message}</p>
`

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 465,
    secure: 'true',
    auth: {
       user: 'atharvard06@gmail.com', //nihshdllhrsghono
       pass: 'zbfhuhuhebtyjmkk',  // could use generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
});



// setup email data with unicode symbols*
  let mailOptions = {
    //from: req.body.email, // sender address
    to:'atharvard06@gmail.com', // list of receivers
    subject: 'Hey! Here is new request to contact from ' + req.body.fullname, // Subject line
    text: 'Hello Atharva, My Contact Details - '+ req.body.email  +  req.body.message, // plain text body 
    html: output // html body
  };

// send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
      res.redirect('/about');
      console.log(error);
    }else{
      res.redirect('/home');
    }
  });

})


app.listen(port, ()=>{
    console.log(`Server is running on port no ${port}`)
});

