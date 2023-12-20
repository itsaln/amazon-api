import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { getJwtConfig } from '@app/config/jwt.config'
import { JwtStrategy } from '@app/auth/jwt.strategy'
import { AuthController } from '@app/auth/auth.controller'
import { AuthService } from '@app/auth/auth.service'
import { PrismaService } from '@app/prisma.service'

@Module({
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy, PrismaService],
	imports: [
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: getJwtConfig
		})
	]
})
export class AuthModule {}
