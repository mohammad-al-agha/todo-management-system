import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { Prisma } from '@prisma/client';
import { AuthRequest } from 'src/core/types/auth.request.type';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(
    @Req() req: AuthRequest,
    @Body() createTodoDto: Prisma.TodoCreateInput,
  ) {
    return this.todoService.create({
      ...createTodoDto,
      user: { connect: { id: req.user!.id } },
    });
  }

  @Get()
  findAll(@Req() req: AuthRequest) {
    return this.todoService.findAll(req.user!.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Req() req: AuthRequest,
    @Param('id') id: string,
    @Body() updateTodoDto: Prisma.TodoUpdateInput,
  ) {
    return this.todoService.update(req.user!.id, +id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Req() req: AuthRequest, @Param('id') id: string) {
    return this.todoService.remove(req.user!.id, +id);
  }
}
