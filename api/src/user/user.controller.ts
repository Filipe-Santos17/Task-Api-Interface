import { Body, Controller, Delete, Param, Post, Put, UsePipes } from '@nestjs/common';
import { UserService } from "./user.service"
import UserDTO from './user.dto';
import { ZodPipe } from '../pipes/zodValidation.pipe';
import {z} from "zod"

const userSchemaValidate = z.object({
    email:    z.string().email(),
    username: z.string(),
    password: z.string(),
})

@Controller('users')
export class UserController {
    constructor(private readonly UserService: UserService){}

    @Post()
    @UsePipes(new ZodPipe(userSchemaValidate))
    createUser(@Body() newUser: UserDTO){
        return this.UserService.createUser(newUser)
    }

    @Post("/reset-password")
    resetPassword(@Body() newPass: string){
        
    }

    @Delete()
    deleteUser(@Param("id") id: UserDTO["id"]){

    }
}
