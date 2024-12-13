require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRouter = require('./Routes/User');
const AuthRouter = require('./Routes/Auth');
const { mongodbconnect } = require('./Views/Connection');
const cors = require('cors');

const mongoURI = process.env.MONGO_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

// const upload = multer({ dest: "uploads/" });
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/auth', AuthRouter);

// mongodbconnect();
app.get('/', async (req, res) => {
    res.send("You are in the home page");
});
const port = process.env.PORT || 6001
app.listen(port, () => {
    console.log('Server is started');
});