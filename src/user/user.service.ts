import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { hash } from 'argon2'
import { Prisma } from '@prisma/client'
import { PrismaService } from '@app/prisma.service'
import { returnUserObject } from '@app/user/return-user.object'
import { UserDto } from '@app/user/user.dto'

@Injectable()
export class UserService {
	constructor(private prismaService: PrismaService) {}

	async byId(id: number, selectObject: Prisma.UserSelect = {}) {
		const user = await this.prismaService.user.findUnique({
			where: { id },
			select: {
				...returnUserObject,
				favorites: {
					select: {
						id: true,
						name: true,
						price: true,
						images: true,
						slug: true
					}
				},
				...selectObject
			}
		})

		if (!user) throw new Error('User not found')

		return user
	}

	async updateProfile(id: number, dto: UserDto) {
		const isSameUser = await this.prismaService.user.findUnique({
			where: { email: dto.email }
		})

		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email already in use')

		const user = await this.byId(id)

		return this.prismaService.user.update({
			where: { id },
			data: {
				email: dto.email,
				name: dto.name,
				avatarPath: dto.avatarPath,
				phone: dto.phone,
				password: dto.password ? await hash(dto.password) : user.password
			}
		})
	}

	async toggleFavorite(userId: number, productId: number) {
		const user = await this.byId(userId)

		if (!user) throw new NotFoundException('User not found')

		const isExists = user.favorites.some(product => product.id === productId)

		await this.prismaService.user.update({
			where: { id: user.id },
			data: {
				favorites: {
					[isExists ? 'disconnect' : 'connect']: {
						id: productId
					}
				}
			}
		})

		return { message: 'Success' }
	}
}
