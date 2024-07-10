import { pbkdf2Sync } from 'crypto';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class HashPassword {
    private SaltEnv: string;

    constructor(private readonly configService: ConfigService){
        this.SaltEnv = this.configService.get<string>("ENV_SALT")
    }

    generateHashPassword(pass: string){
        return pbkdf2Sync(pass, this.SaltEnv, 10, 64, 'sha512').toString('hex')
    }

    comparePasswords({ pass, hash }:{ pass:string, hash: string }){
        const newHash = this.generateHashPassword(pass)
        return newHash === hash
    }
}