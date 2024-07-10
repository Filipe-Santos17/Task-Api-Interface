import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import { TaskModule } from './task/task.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DbModule, UserModule, ConfigModule.forRoot({
    validate: (env) => envSchema.parse(env),
    isGlobal: true
  }), TaskModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
