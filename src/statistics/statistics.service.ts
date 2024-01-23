import { Injectable } from '@nestjs/common'
import { PrismaService } from '@app/prisma.service'

@Injectable()
export class StatisticsService {
	constructor(private prismaService: PrismaService) {}

	async getMain() {
		const ordersCount = await this.prismaService.order.count()
		const reviewsCount = await this.prismaService.order.count()
		const usersCount = await this.prismaService.order.count()

		const totalAmount = await this.prismaService.order.aggregate({
			_sum: {
				total: true
			}
		})

		return [
			{
				name: 'Orders',
				value: ordersCount
			},
			{
				name: 'Reviews',
				value: reviewsCount
			},
			{
				name: 'Favorites',
				value: usersCount
			},
			{
				name: 'Total amount',
				value: totalAmount._sum.total || 0
			}
		]
	}
}
