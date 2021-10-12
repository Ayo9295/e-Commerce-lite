const express = require("express");
const auth = require("../middleware/auth");
const multer = require("multer");

const router = express.Router();

var storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, "./uploads");  
      },
      filename: function (req, file, cb) {
          cb(null, file.originalname);
      },
});
var upload = multer ({ storage: storage});

router.post('/', upload.single("image"), (req, res, next) => {
    console.log (req.body);
    console.log (req.file);
    return res.json({message: "uploaded"});
    // retur next();
}) 

module.exports = router;