import multer from 'multer'

export const fileValidation = {
    image : ['image/png', 'image/jpeg', 'image/webp, image/jpg'],
    pdf : ['application/pdf']
}
function fileUpload(CustomValidation = []){
    const storage = multer.diskStorage({}) //بدنا نشتغل كلاوندري عشان هيك بخليها فاضية
    function fileFilter(req, file, cb){
        if(CustomValidation.includes(file.mimetype)){
            cb(null, true) // ما ترجع  ايرور وخلص ترو رجع الصورة
        }else{
            cb("invalid format", false)
        }
    }
    const upload = multer({fileFilter, storage})
    return upload
}

export default fileUpload