const multer = require("multer");


const storage = multer.diskStorage ({
    destination: function (req, file, cb) {
        cb(null, "./uploads");  
      },
      filename: function (req, file, cb) {
          cb(null, file.originalname);
      },
});

const upload = multer ({ storage });

exports.uploadSingle = upload.single('image')
exports.uploadMultiple = upload.array('image')
