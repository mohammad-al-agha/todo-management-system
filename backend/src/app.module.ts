import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './domain/database/database.module';
import { TodoModule } from './domain/todo/todo.module';
import { AuthModule } from './domain/auth/auth.module';
import { UserModule } from './domain/user/user.module';

@Module({
  imports: [DatabaseModule, TodoModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
