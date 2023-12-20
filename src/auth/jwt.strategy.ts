import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { User } from '@prisma/client'
import { PrismaService } from '@app/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(
		configService: ConfigService,
		private prismaService: PrismaService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: true,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

	async validate({ id }: Pick<User, 'id'>) {
		return this.prismaService.user.findUnique({ where: { id: +id } })
	}
}
