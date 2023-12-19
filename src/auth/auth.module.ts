import { Module } from '@nestjs/common'
import { AuthService } from '@/app/auth/auth.service'
import { AuthController } from '@/app/auth/auth.controller'

@Module({
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {}
