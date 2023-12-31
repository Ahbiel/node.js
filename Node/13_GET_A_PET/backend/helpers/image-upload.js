import multer from "multer";
import path from "path";

// Destination to store image
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (req.baseUrl.includes('users')) {
      folder = "users";
      console.log(req.baseUrl,'test')
    } else if (req.baseUrl.includes('pets')) {
      folder = "pets";
    }
    cb(null, `public/images/${folder}/`);
  },
  filename: (req, file, cb) => {
    cb(null,
       Date.now() + 
       String(Math.floor(Math.random()*100)) + 
       path.extname(file.originalname)); 
       //deixar o nome único com valores aleatórios, data e o nome do arquivo
  },
});

const imageUpload = multer({
  storage: imageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      // upload only png and jpg format
      return cb(new Error("Por favor, envie apenas png ou jpg!"));
    }
    cb(undefined, true);
  },
});

export default imageUpload