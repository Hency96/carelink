const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');

const app = express();

//middleware
app.use(express.static('public'));
app.use(express.json());


//view Engine
app.set('view engine', 'ejs');



//db connection
const dbURI = 'mongodb+srv://hencynikky:sBjYhC3vYdg25PPb@cluster0.69mqtjo.mongodb.net/Carelink';
mongoose.connect(dbURI, {  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

  
app.get('/', (req, res) => res.render('home'));
app.get('/dashboard', (req, res) => res.render('dashboard'));
app.use(authRoutes);
  
