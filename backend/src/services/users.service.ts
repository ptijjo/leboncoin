import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@/exceptions/httpException';
import { User } from '@interfaces/users.interface';
import { localDate } from '@/utils/localDate';

@Service()
export class UserService {
  public user = new PrismaClient().user;

  public async findAllUser(): Promise<User[]> {
    const allUser: User[] = await this.user.findMany({
      include: {
        adress: true,
        favori: true,
      },
    });
    return allUser;
  }

  public async findUserById(userId: string): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: CreateUserDto): Promise<User> {
    const findEmail: User = await this.user.findUnique({ where: { email: userData.email } });
    if (findEmail) throw new HttpException(409, `This email ${userData.email} already exists`);

    const findPseudo: User = await this.user.findUnique({ where: { pseudo: userData.pseudo } });
    if (findPseudo) throw new HttpException(409, `This email ${userData.pseudo} already exists`);

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const created_at = localDate();
    const photo_profil = 'https://vibz.s3.eu-central-1.amazonaws.com/logo/photoProfil.png';
    const createUserData: User = await this.user.create({ data: { ...userData, password: hashedPassword, photo_profil, created_at } });
    return createUserData;
  }

  public async connection(userData: { identifiant: string; password: string }): Promise<User> {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (regexEmail.test(userData.identifiant)) {
      const findEmail: User = await this.user.findUnique({ where: { email: userData.identifiant } });
      if (!findEmail) throw new HttpException(409, `Identifiants incorrects !`);

      const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findEmail.password);
      if (!isPasswordMatching) throw new HttpException(409, `Identifiants incorrects !`);

      const updateUser = await this.user.update({
        where: {
          email: findEmail.email,
        },
        data: {
          last_connection: localDate(),
        },
      });
      return updateUser;
    } else {
      const findPseudo: User = await this.user.findUnique({ where: { pseudo: userData.identifiant } });
      if (!findPseudo) throw new HttpException(409, `Identifiants incorrects !`);

      const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findPseudo.password);
      if (!isPasswordMatching) throw new HttpException(409, `Identifiants incorrects !`);

      const updateUser = await this.user.update({
        where: {
          pseudo: findPseudo.pseudo,
        },
        data: {
          last_connection: localDate(),
        },
      });
      return updateUser;
    }
  }

  public async updateUser(userId: string, userData: CreateUserDto): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const updateUserData = await this.user.update({ where: { id: userId }, data: { ...userData, password: hashedPassword } });
    return updateUserData;
  }

  public async deleteUser(userId: string): Promise<User> {
    const findUser: User = await this.user.findUnique({ where: { id: userId } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const deleteUserData = await this.user.delete({ where: { id: userId } });
    return deleteUserData;
  }
}
