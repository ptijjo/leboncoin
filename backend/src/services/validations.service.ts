/* eslint-disable prettier/prettier */
import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';
import { HttpException } from '@/exceptions/httpException';
import { Validation } from '@interfaces/validations.interface';

@Service()
export class ValidationService {
  public validation = new PrismaClient().validation;

  public async createValidation(): Promise<Validation> {
    const newValidation = await this.validation.create({});

    return newValidation;
  }

  public async valideArticle(validationId: string, validationData: Validation): Promise<Validation> {
    const findValidation: Validation = await this.validation.findUnique({ where: { id: validationId } });
    if (!findValidation) throw new HttpException(409, "Validation doesn't exist");

    const updateValidation = await this.validation.update({ where: { id: validationId }, data: { ...validationData, status: true } });
    return updateValidation;
  }

  public async refuseArticle(validationId: string): Promise<Validation> {
    const findValidation: Validation = await this.validation.findUnique({ where: { id: validationId } });
    if (!findValidation) throw new HttpException(409, "Validation doesn't exist");

    const deleteValidationData = await this.validation.delete({ where: { id: validationId } });
    return deleteValidationData;
  }
}
