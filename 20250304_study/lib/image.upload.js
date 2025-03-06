const multer = require("multer");
const path = require("path");

exports.upload = multer({storage : multer.diskStorage(
    {
        destination : (req,file,cb)=> {
            cb(null, "upload")
        },
        filename : (req,file,cb)=> {
            const ext = path.extname(file.originalname);
            const baseName = path.basename(file.originalname, ext) + "_" + Date.now();
            cb(null, baseName + ext);
        }
    }),
    limit : {filesize: 5*1024*1024}
});