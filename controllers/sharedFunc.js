"use strict";
const jwt = require("jsonwebtoken");
const fs = require("fs");

  function uploadImgFunc() {
    const multer = require("multer");
    const fileStorageEngine = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, "./images");
      },
      filename: function (req, file, cb) {
        // const uniqueSuffix =  Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname);
      },
    });
    // const upload = multer({ storage: fileStorageEngine, limits:{ fileSize: 1024 * 1024 * 5 } });
  
    return multer({ storage: fileStorageEngine });
  }

  function deleteImgFunc(imgName) {
    fs.unlinkSync("./images/" + imgName);
  }

  function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }

  function sigToken(token){
    return jwt.sign(token, process.env.JWT_SECRET, { algorithm: "HS256"});
  }

  
  module.exports = {
    uploadImgFunc,
    verifyToken,
    deleteImgFunc,
    sigToken,
  };
  