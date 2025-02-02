import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.')[1]);
    }
})

export const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const fileType = file.mimetype.split("/")[0];

        const allowedFiles = {
            image: ["image/jpeg", "image/jpg", "image/png", "image/webp"],
        };

        if (allowedFiles[fileType] && allowedFiles[fileType].includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error(`Invalid file type!`));
        }
    },
    limits: {
        fileSize: 2 * 1024 * 1024
    }
});