/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { Media } from '../interfaces/medias.interface';
import { HttpException } from '@/exceptions/httpException';
import { Service } from 'typedi';

@Service()
export class MediaService {
  public media = new PrismaClient().media;

  public findAllMedia = async (): Promise<Media[]> => {
    const findMedia: Media[] = await this.media.findMany();

    return findMedia;
  };

  public createMedia = async (req: any, articleId: string): Promise<Media> => {
    const newMedia = await this.media.create({
      data: {
        url: `${req.protocol}://${req.get('host')}/public/image/${req.file.filename}`.split(' ').join(''),
        articleId: articleId,
      },
    });

    return newMedia;
  };

  public deleteMedia = async (mediaId: string): Promise<Media> => {
    const findMedia: Media = await this.media.findUnique({
      where: {
        id: mediaId,
      },
    });

    if (!findMedia) throw new HttpException(409, `This media doesn't exist !`);

    const deleteElem = await this.media.delete({ where: { id: findMedia.id } });

    return deleteElem;
  };
}
