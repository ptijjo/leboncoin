import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { User } from '@interfaces/users.interface';
import { UserService } from '@services/users.service';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY, EXPIRED_TOKEN } from '@config';

export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const findAllUsersData: User[] = await this.user.findAllUser();

      res.status(200).json({ data: findAllUsersData, message: 'findAllUsers' });
    } catch (error) {
      next(error);
    }
  };

  public getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      const findOneUserData: User = await this.user.findUserById(userId);

      res.status(200).json({ data: findOneUserData, message: 'findOneUser' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: User = req.body;
      const createUserData: User = await this.user.createUser(userData);

      res.status(201).json({ data: createUserData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public connectUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData: { identifiant: string; password: string } = req.body;
      const connectUserData: User = await this.user.connection(userData);

      //Creation du token d'authentification

      const token = jwt.sign(
        {
          userId: connectUserData.id,
          userEmail: connectUserData.email,
          userFirstName: connectUserData.first_name,
          userLastName: connectUserData.last_name,
          userRole: connectUserData.role,
          userPseudo: connectUserData.pseudo,
          userPhoto: connectUserData.photo_profil,
          userLastConnection: connectUserData.last_connection,
        },
        SECRET_KEY as string,
        { expiresIn: EXPIRED_TOKEN as string },
      );

      res.status(200).json({ data: connectUserData, token: token, message: 'connected' });
    } catch (error) {
      next(error);
    }
  };

  public whoIsConnected = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        throw Error('Token is missing');
      }

      const decodedToken = jwt.verify(token, SECRET_KEY) as JwtPayload;
      const userId: string = await decodedToken.userId;
      const userPhoto = await decodedToken.userPhoto;
      const userEmail = await decodedToken.userEmail;
      const userPseudo = await decodedToken.userPseudo;
      const userRole = await decodedToken.userRole;

      res.status(200).json({
        userId,
        userPhoto,
        userEmail,
        userPseudo,
        userRole,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      const userData: User = req.body;
      const updateUserData: User = await this.user.updateUser(userId, userData);

      res.status(200).json({ data: updateUserData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = String(req.params.id);
      const deleteUserData: User = await this.user.deleteUser(userId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}
