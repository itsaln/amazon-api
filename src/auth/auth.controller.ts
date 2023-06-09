import { Controller, HttpCode, Post } from '@nestjs/common'
import { AuthService } from '@app/auth/auth.service'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@HttpCode(200)
	@Post('register')
	register() {
		return this.authService.register()
	}
}
