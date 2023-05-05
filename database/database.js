const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.set('ENV', process.env.ENV || 'CRMPRODSCKT');
mongoose.connect('mongodb+srv://devprodesso:devapp.CRM2022@prodessosystems.o5ljv.mongodb.net/' + app.get('ENV') + '?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(db => console.log('Db is connected'))
  .catch(err => (
    mongoose.connect("mongodb://localhost:27017/CRMPROD1", function(err, db) {
      if (err) throw err;
      if (db) throw db;
      // Use this space to pass MongoDB CRUD code here             
    })
  ))
