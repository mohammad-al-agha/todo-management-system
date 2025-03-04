import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/domain/database/database.service';

@Injectable()
export class TodoService {
  constructor(private readonly dataBaseService: DatabaseService) {}

  create(createTodoDto: Prisma.TodoCreateInput) {
    return this.dataBaseService.todo.create({
      data: createTodoDto,
    });
  }

  findAll(id: number) {
    return this.dataBaseService.todo.findMany({
      where: { userId: id },
    });
  }

  findOne(id: number) {
    return this.dataBaseService.todo.findUnique({
      where: { id },
    });
  }

  update(userId: number, id: number, updateTodoDto: Prisma.TodoUpdateInput) {
    return this.dataBaseService.todo.update({
      where: { id, userId },
      data: updateTodoDto,
    });
  }

  remove(userId: number, id: number) {
    return this.dataBaseService.todo.delete({
      where: { id, userId },
    });
  }
}
