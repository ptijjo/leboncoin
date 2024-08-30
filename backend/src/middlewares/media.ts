/* eslint-disable prettier/prettier */
import { SECRET_KEY } from '@/config';
import { Request, Response } from 'express';
import multer from 'multer';
import jwt from 'jsonwebtoken';
import { join } from 'path';

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png',
};

const storage = multer.diskStorage({
  // Spécifie le répertoire de destination
  destination: (req: Request, file: any, callback: (error: Error | null, destination: string) => void) => {
    // on indique ou on va enregistrer les fichiers
    const uploadPath = join(__dirname, '..',"..", 'public', 'image');
    callback(null, uploadPath);
  },

  // Spécifie le nom du fichier
  filename: (req: Request, file: any, callback: (error: Error | null, filename: string) => void) => {
    const header = req.header('Authorization');

    if (!header) {
      return callback(new Error('Authorization header is missing'), "");
    }

    try {
      const token = header.split(' ')[1];
      const decodedToken = jwt.verify(token, SECRET_KEY as string) as {
        userId: string;
        userEmail: string;
        userPseudo: string;
      };

      const { userId, userEmail, userPseudo } = decodedToken;
      const name = `${userPseudo}_${userEmail}_${userId}`;
      const extension = MIME_TYPES[file.mimetype] || 'unknown';
      const filename = `${name}${Date.now()}.${extension}`;
      callback(null, filename);
    } catch (error) {
      callback(error as Error, '');
    }
  },
});

const media = multer({ storage }).single('media');
export default media;
