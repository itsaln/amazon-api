import {
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from '@app/auth/auth.service'
import { AuthDto } from '@app/auth/auth.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('register')
	register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}
}
