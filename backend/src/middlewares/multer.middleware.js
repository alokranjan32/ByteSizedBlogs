import multer from 'multer'
import fs from 'fs'
import path from 'path'

const uploadPath = './public/temp'

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        fs.mkdirSync(uploadPath, { recursive: true })
        cb(null, uploadPath)
    },
    filename:function(req,file,cb){
        const uniqueSuffix=Date.now()+'-'+Math.round(Math.random()*1E9)
        cb(null,file.fieldname+'-'+uniqueSuffix+path.extname(file.originalname))
    }
})
export const upload=multer({
    storage
})
