import { Request } from 'express';
import { extname } from 'path';

export const editFileName = (req: Request, file, cb) => {
  console.log(req.params.id);
  const nameOfVideo = req.params.id;
  req.body.filename = `${nameOfVideo}${extname(file.originalname)}`;
  return cb(null, req.body.filename);
};
