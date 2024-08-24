/* eslint-disable prettier/prettier */
import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { Validation } from '@interfaces/validations.interface';
import { ValidationService } from '@services/validations.service';

export class ValidationController {
  public validation = Container.get(ValidationService);

  public createValidationArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validationId = String(req.params.id);
      const valideData: Validation = req.body;
      const createValidationArticle: Validation = await this.validation.valideArticle(validationId, valideData);

      res.status(200).json({ data: createValidationArticle, message: 'Validated article !' });
    } catch (error) {
      next(error);
    }
  };

  public refuseValidationArticle = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const validationId = String(req.params.id);
      const refuseValidationArticle = await this.validation.refuseArticle(validationId);

      res.status(200).json({ data: refuseValidationArticle, messsage: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
