import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DbService } from 'src/db/db.service';
import { HashPassword } from 'src/utils/hashPassword.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UserController],
  providers: [UserService, DbService, HashPassword, ConfigService]
})
export class UserModule {}
