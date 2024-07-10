import { UnauthorizedException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';
import { HashPassword } from 'src/utils/hashPassword.service';

type userAuth = {
    email: string,
    password: string,
}

@Injectable()
export class AuthService {
    constructor(
        private readonly Authenticator: JwtService, 
        private readonly DB: DbService, 
        private readonly Hash: HashPassword,
    ){}

    private showError(){
        throw new UnauthorizedException('User credentials do not match.')
    }

    async authUser({email, password}:userAuth){
        const userAlreadyExist = await this.DB.user.findUnique({
            where:{
                email
            }
        })

        if(!userAlreadyExist){
            this.showError()
        }

        const comparePasswords = this.Hash.comparePasswords(
            {hash: userAlreadyExist.password, pass: password }
        )

        if(!comparePasswords){
            this.showError()
        }

        const accessToken = this.Authenticator.sign({ sub: userAlreadyExist.id, username: userAlreadyExist.username })

        return {
            access_token: accessToken, 
            lifetime: 3600,
        }
    }
}
