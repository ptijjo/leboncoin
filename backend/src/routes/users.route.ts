/* eslint-disable prettier/prettier */
import { Router } from 'express';
import { UserController } from '@controllers/users.controller';
import { CreateUserDto } from '@dtos/users.dto';
import { Routes } from '@interfaces/routes.interface';
import { ValidationMiddleware } from '@middlewares/validation.middleware';
import { modo } from '@/middlewares/modo';
import { auth } from '@/middlewares/auth';

export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, modo, this.user.getUsers);
    this.router.get(`${this.path}/:id`, modo, this.user.getUserById);
    this.router.post(`${this.path}`, ValidationMiddleware(CreateUserDto), this.user.createUser);
    this.router.post(`${this.path}_connection`, this.user.connectUser);
    this.router.get(`${this.path}_whoConnected`, this.user.whoIsConnected);
    this.router.put(`${this.path}/:id`, auth, ValidationMiddleware(CreateUserDto, true), this.user.updateUser);
    this.router.delete(`${this.path}/:id`, auth, this.user.deleteUser);
  }
}
