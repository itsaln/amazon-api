import { Injectable } from '@nestjs/common'
import { PrismaService } from '@app/prisma.service'
import { returnUserObject } from '@app/user/return-user.object'
import { UserDto } from '@app/user/user.dto'

@Injectable()
export class UserService {
	constructor(private prismaService: PrismaService) {}

	async byId(id: number) {
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
				}
			}
		})

		if (!user) throw new Error('User not found')

		return user
	}

	async updateProfile(id: number, dto: UserDto) {}

	async toggleFavorite(id: number, productId: number) {}
}
