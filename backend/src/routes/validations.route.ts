/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { ValidationController } from '@controllers/validations.controller';
import { CreateValidationDto } from '@dtos/validations.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { modo } from '@/middlewares/modo';

export class ValidationRoute implements Routes {
  public path = '/validations';
  public router = Router();
  public validation = new ValidationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, modo, ValidationMiddleware(CreateValidationDto), this.validation.createValidationArticle);
    this.router.delete(`${this.path}/:id`, modo, this.validation.refuseValidationArticle);
  }
}
