const express = require('express')
const router = express.Router()
const path = require('path');
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Set the directory where files will be saved
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + path.extname(file.originalname)); // Append the original extension
    },
  });
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (allowedTypes.includes(file.mimetype)) {
        cb(null, true); // Accept file
      } else {
        cb(new Error('Only JPEG, PNG, or GIF files are allowed!'), false); // Reject file
      }
    },
  });
  
const {loginuser,addnewuser} =  require('..//Controlers/Auth')
router.post('/login', loginuser)
router.post('/signup',upload.single('image') , addnewuser)
module.exports= router