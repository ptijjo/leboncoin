/* eslint-disable prettier/prettier */
import { SECRET_KEY } from '@/config';
import { Request, Response } from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  // on enregistre sur le disque
  destination: (req: Request, file: any, callback: (arg0: null, arg1: string) => void) => {
    // on indique ou on va enregistrer les fichiers
    callback(null, '/public/image/');
  },
  filename: (req: any, res: Response, file, callback) => {
    const header = req.header('Authorization');

    if (!header) {
      return res.status(403).json({ error: 'Authorization header is missing' });
    }
    const token = header.split(' ')[1];
    const decodedToken = jwt.verify(token, SECRET_KEY as string) as {
      userId: string;
      userEmail: string;
      userPseudo: string;
    };
    const { userId, userEmail, userPseudo } = decodedToken;

    const name = `${userPseudo}_${userEmail}_${userId}`;
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  },
});

const media = multer({ storage: storage }).array('media'[10]);
export default media;
