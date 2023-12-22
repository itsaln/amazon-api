import { Injectable } from '@nestjs/common'
import { PrismaService } from '@app/prisma.service'
import { returnReviewObject } from '@app/review/return-review.object'
import { ReviewDto } from '@app/review/review.dto'

@Injectable()
export class ReviewService {
	constructor(private prismaService: PrismaService) {}

	async getAll() {
		return this.prismaService.review.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			select: returnReviewObject
		})
	}

	async create(userId: number, productId: number, dto: ReviewDto) {
		// TODO: Проверка на существование товара когда создаем отзыв

		return this.prismaService.review.create({
			data: {
				...dto,
				product: {
					connect: { id: productId }
				},
				user: {
					connect: { id: userId }
				}
			}
		})
	}

	async getAverageValueByProductId(productId: number) {
		return this.prismaService.review
			.aggregate({
				where: { productId },
				_avg: { rating: true }
			})
			.then(data => data._avg)
	}
}
