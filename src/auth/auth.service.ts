import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { faker } from '@faker-js/faker'
import { hash } from 'argon2'
import { PrismaService } from '@app/prisma.service'
import { AuthDto } from '@app/auth/auth.dto'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
	constructor(
		private prismaService: PrismaService,
		private jwtService: JwtService
	) {}

	async register(dto: AuthDto) {
		const oldUser = await this.prismaService.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (oldUser) throw new BadRequestException('User already exists')

		const user = await this.prismaService.user.create({
			data: {
				email: dto.email,
				name: faker.name.firstName(),
				avatarPath: faker.image.avatar(),
				phone: faker.phone.number('+998 (##) ### ## ##'),
				password: await hash(dto.password)
			}
		})

		const tokens = await this.issueTokens(user.id)

		return {
			user: this.returnUserFields(user),
			...tokens
		}
	}

	private async issueTokens(userId: number) {
		const data = { id: userId }

		const accessToken = this.jwtService.sign(data, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwtService.sign(data, {
			expiresIn: '7d'
		})

		return { accessToken, refreshToken }
	}

	private async returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email
		}
	}
}
