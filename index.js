const express = require('express');
const app = express();
const morgan = require('morgan');
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const fileUpload = require('express-fileupload');
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://<username>:SANJU123@cluster0.mochtd4.mongodb.net/Shopy').then((data) => {
console.log('connected');
  app.listen(5000);
}).catch((err) => {
  console.log(err);
})

app.use('/uploads', express.static('uploads'));



app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true,
  createParentPath: true
}));

app.use(productRoutes);
app.use(authRoutes);
app.use(orderRoutes);

app.use((req, res) => {
  return res.status(404).json({
    status: 'error',
    message: 'not found'
  });
});



