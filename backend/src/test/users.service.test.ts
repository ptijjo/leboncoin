/* eslint-disable prettier/prettier */
import { PrismaClient, User } from '@prisma/client';
import { UserService } from '@/services/users.service';


jest.mock('@prisma/client');
jest.mock('bcrypt');

const mockFindMany = jest.fn();
const mockFindUnique = jest.fn();
const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockDelete = jest.fn();

describe('UserService', () => {
  let userService: UserService;
  let prismaMock: PrismaClient;

  beforeEach(() => {
    prismaMock = {
      user: {
        findMany: mockFindMany,
        findUnique: mockFindUnique,
        create: mockCreate,
        update: mockUpdate,
        delete: mockDelete,
      } as any,
    } as PrismaClient;

    userService = new UserService();
    (userService as any).user = prismaMock.user; // Inject the mocked Prisma client
  });

  describe('findAllUser', () => {
    it('should return all users', async () => {
      const mockUsers: User[] = [
        {
          id: '1',
          email: 'test@test.com',
          password: 'hashedPassword',
          pseudo: 'test',
          first_name: 'John',
          last_name: 'Doe',
          photo_profil: 'photo.jpg',
          phone: 1234567890,
          role: 'user', // Assurez-vous que le rôle est correctement défini
          created_at: new Date().toISOString(),
          last_connection: new Date().toISOString(),
        },
      ];

      mockFindMany.mockResolvedValue(mockUsers);

      const result = await userService.findAllUser();

      expect(result).toEqual(mockUsers);
      expect(mockFindMany).toHaveBeenCalledTimes(1);
    });
  });
});
