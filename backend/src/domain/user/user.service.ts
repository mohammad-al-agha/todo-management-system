import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createUserDto,
    });
  }

  findById(id: number) {
    return this.databaseService.user.findUnique({
      where: { id },
    });
  }

  findOne(email: string) {
    return this.databaseService.user.findUnique({
      where: { email: email },
    });
  }
}
