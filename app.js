require('dotenv').config()
const express = require('express');
const app = express();
const userRouter = require('./Routes/User');
const AuthRouter = require('./Routes/Auth');
const { mongodbconnect } = require('./Views/Connection');
const cors = require('cors');



// const upload = multer({ dest: "uploads/" });
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/auth', AuthRouter);

mongodbconnect();
app.get('/', async (req, res) => {
    res.send("You are in the home page");
});
const port = process.env.PORT || 6001
app.listen(port, () => {
    console.log('Server is started');
});