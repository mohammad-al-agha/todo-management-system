import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { Prisma } from '@prisma/client';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.userService.findById(+id);
  }

  @Post('find')
  findOne(@Body() id: string) {
    return this.userService.findOne(id);
  }
}
