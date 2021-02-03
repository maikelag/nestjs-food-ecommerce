import { fstat, lstat, unlink } from "fs";
import { extname, join, resolve } from "path";

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};


export const removeImage = (imageName) => {
  return new Promise((resolve, reject) => { 
    unlink(join('public', imageName), err => {
      if(err) {
        return reject(err);
      }
      resolve('imagen eliminada correctamente');
    })
  })
}

