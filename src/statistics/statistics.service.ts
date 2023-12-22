import { Injectable } from '@nestjs/common'
import { PrismaService } from '@app/prisma.service'
import { UserService } from '@app/user/user.service'

@Injectable()
export class StatisticsService {
	constructor(
		private prismaService: PrismaService,
		private userService: UserService
	) {}

	async getMain(userId: number) {
		const user = await this.userService.byId(userId, {
			orders: {
				select: {
					items: true
				}
			},
			reviews: true
		})

		// TODO: Закончить статистику

		// // PLEASE DON'T USE IN PRODUCTION
		// for (let order of user.orders) {
		// 	let total= 0
		//
		// 	for (let price of order.price) {
		// 		total += price.value
		// 	}
		// 	;(order as any).total = total
		// }

		return [
			{
				name: 'Orders',
				value: user.orders.length
			},
			{
				name: 'Reviews',
				value: user.reviews.length
			},
			{
				name: 'Favorites',
				value: user.favorites.length
			},
			{
				name: 'Total amount',
				value: 1000
			}
		]
	}
}
