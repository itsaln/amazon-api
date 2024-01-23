import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from '@app/config/jwt.config'
import { JwtStrategy } from '@app/auth/jwt.strategy'
import { AuthController } from '@app/auth/auth.controller'
import { AuthService } from '@app/auth/auth.service'
import { PrismaService } from '@app/prisma.service'
import { UserService } from '@app/user/user.service'
import { UserModule } from '@app/user/user.module'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService, UserService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		}),
		UserModule
	]
})
export class AuthModule {}
