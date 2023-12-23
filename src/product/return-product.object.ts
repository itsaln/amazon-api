import { Prisma } from '@prisma/client'
import { returnReviewObject } from '@app/review/return-review.object'
import { returnCategoryObject } from '@app/category/return-category.object'

export const returnProductObject: Prisma.ProductSelect = {
	id: true,
	name: true,
	slug: true,
	price: true,
	description: true,
	images: true,
	createdAt: true
}

export const returnProductObjectFullest: Prisma.ProductSelect = {
	...returnProductObject,
	reviews: {
		select: returnReviewObject
	},
	category: {
		select: returnCategoryObject
	}
}
