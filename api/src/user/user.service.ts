import { ConflictException, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import UserDTO from './user.dto';
import { DbService } from 'src/db/db.service';
import { HashPassword } from 'src/utils/hashPassword.service';

@Injectable()
export class UserService {
    SaltEnv: string;

    constructor(private readonly DB: DbService, private readonly Hash:HashPassword){}

    async createUser(user: UserDTO){
        const userWithThisEmailAlreadyExist = await this.DB.user.findUnique({
            where:{
                email: user.email
            }
        })

        if(userWithThisEmailAlreadyExist){
            throw new ConflictException("User with this email already exist")
        }

        try {
            await this.DB.user.create({
                data:{ 
                    groupTasks: undefined,
                    email: user.email,
                    username: user.username,
                    password: this.Hash.generateHashPassword(user.password),
                }
            })

            return {
                statusCode: HttpStatus.CREATED,
                message: 'User created successfully',
            };
        } catch(e){
            throw new HttpException("That's not possible create you user!", HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
