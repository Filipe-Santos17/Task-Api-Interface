import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { Env } from 'src/env'
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DbService } from 'src/db/db.service'
import { HashPassword } from 'src/utils/hashPassword.service'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      global: true,
      useFactory: async (config: ConfigService<Env, true>) => ({
        secret: config.get<string>('ENV_SALT'),
        signOptions: { algorithm: 'HS256', expiresIn: 3600 },
      })

        // const privateKey = config.get('JWT_PRIVATE_KEY', { infer: true })
        // const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true })

        // return {
        //   signOptions: { algorithm:'RS256' },
        //   privateKey,
        //   publicKey
        // }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, DbService, HashPassword], //Não se prover o JwtService
})
export class AuthModule {}