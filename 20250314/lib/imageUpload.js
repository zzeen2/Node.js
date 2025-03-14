const multer = require('multer');
const path = require('path');

// module.exports = {upload}
exports.upload = multer({
    storage : multer.diskStorage({
        destination : (req,res, cb) => {
            cb(null, 'public/images/');
        },
        filename : (req, file ,cb) => {
            // 고양이.png 
            const ext = path.extname(file.originalname); 
            // .png
            const fileName = Buffer.from(path.basename(file.originalname,ext),'latin1').toString('utf8') 
            const filename = fileName + '_' + Date.now() + ext;
            // 고양이_1233312323.png
            cb(null, filename)
        }
    }),
    limits : {fileSize : 5 * 1024 * 1024 } //5mb
})
