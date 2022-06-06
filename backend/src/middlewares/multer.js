const expressAsyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path')
const fileStorageEngine = multer.diskStorage({
    destination: (req,file,callBackFn) => {
        //specify we want to store the image
        callBackFn(null,__dirname+'/../../uploads/images/');
    },
    filename: (req,file,callBackFn) => {
        
        //avoid storing two images with the same name
        callBackFn(null,Date.now()+"--"+file.originalname);
    }
})



const upload = multer({
    storage:fileStorageEngine,
    limits: {fileSize: 1000000}, // 1MB
    fileFilter: (req,file,callBackFn) => {
        checkType(file,callBackFn);
    }
}).single('photo');


// check file type
const checkType = (file,callBackFn) => {

    //allowed types
    const extensions = ['.png','.jpeg','.jpg'];

    // get the extension
    const fileExtension = path.extname(file.originalname.toLowerCase());

    //get file's mimetype
    const mimeType = `.${file.mimetype.split('/')[1]}`;
    console.log(fileExtension + ' ' + mimeType)

    if(extensions.includes(fileExtension) && extensions.includes(mimeType)){
        callBackFn(null,true);
    }else{
        callBackFn("Only PNG, JPEG and JPG types are allowed");
    }
}


module.exports = upload;