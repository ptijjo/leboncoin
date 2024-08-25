/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { ValidationController } from '@controllers/validations.controller';
import { Routes } from '@interfaces/routes.interface';
import { modo } from '@/middlewares/modo';

export class ValidationRoute implements Routes {
  public path = '/validations';
  public router = Router();
  public validation = new ValidationController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, modo, this.validation.createValidationArticle);
    this.router.delete(`${this.path}/:id`, modo, this.validation.refuseValidationArticle);
  }
}
