import { Controller, Post, Body } from '@nestjs/common';
import { z } from "zod";
import { UsePipes } from '@nestjs/common';
import { ZodPipe } from 'src/pipes/zodValidation.pipe';
import { AuthService } from './auth.service';

const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

type AuthenticateBodySchema = {
    email: string,
    password: string,
};

@Controller('auth')
@UsePipes(new ZodPipe(authenticateBodySchema))
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    authUser(@Body() bodyPass: AuthenticateBodySchema) {
        return this.authService.authUser(bodyPass);
    }
}
