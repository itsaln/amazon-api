import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@app/prisma.service'
import { Prisma } from '@prisma/client'
import { returnProductObject } from '@app/product/return-product.object'
import { ProductDto } from '@app/product/dto/product.dto'
import {
	EnumProductSort,
	GetAllProductDto
} from '@app/product/dto/get-all-product.dto'
import { generateSlug } from '@app/utils/generate-slug'
import { PaginationService } from '@app/pagination/pagination.service'

@Injectable()
export class ProductService {
	constructor(
		private prismaService: PrismaService,
		private paginationService: PaginationService
	) {}

	async getAll(dto: GetAllProductDto = {}) {
		const { sort, searchTerm } = dto

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

		switch (sort) {
			case EnumProductSort.LOW_PRICE:
				prismaSort.push({ price: 'asc' })
				break
			case EnumProductSort.HIGH_PRICE:
				prismaSort.push({ price: 'desc' })
				break
			case EnumProductSort.OLDEST:
				prismaSort.push({ createdAt: 'asc' })
				break
			case EnumProductSort.NEWEST:
				prismaSort.push({ createdAt: 'desc' })
				break
		}

		const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{
							category: {
								name: {
									contains: searchTerm,
									mode: 'insensitive'
								}
							}
						},
						{
							name: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						},
						{
							description: {
								contains: searchTerm,
								mode: 'insensitive'
							}
						}
					]
				}
			: {}

		const { perPage, skip } = this.paginationService.getPagination(dto)

		const products = await this.prismaService.product.findMany({
			where: prismaSearchTermFilter,
			orderBy: prismaSort,
			skip,
			take: perPage,
			select: returnProductObject
		})

		return {
			products,
			length: await this.prismaService.product.count({
				where: prismaSearchTermFilter
			})
		}
	}

	async byId(id: number) {
		const product = await this.prismaService.product.findUnique({
			where: {
				id
			},
			select: returnProductObject
		})

		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async bySlug(slug: string) {
		const product = await this.prismaService.product.findUnique({
			where: {
				slug
			},
			select: returnProductObject
		})

		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async byCategory(categorySlug: string) {
		const products = await this.prismaService.product.findMany({
			where: {
				category: {
					slug: categorySlug
				}
			},
			select: returnProductObject
		})

		if (!products) throw new NotFoundException('Product not found')

		return products
	}

	async getSimilar(id: number) {
		const currentProduct = await this.byId(id)

		if (!currentProduct)
			throw new NotFoundException('Current product not found')

		return this.prismaService.product.findMany({
			where: {
				category: {
					name: currentProduct.category.name
				},
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: {
				createdAt: 'desc'
			},
			select: returnProductObject
		})
	}

	async create() {
		const product = await this.prismaService.product.create({
			data: {
				name: '',
				slug: '',
				description: '',
				price: 0
			}
		})

		return product.id
	}

	async update(id: number, dto: ProductDto) {
		const { name, description, price, images, categoryId } = dto

		// TODO: Проверка на существование категорий товара

		return this.prismaService.product.update({
			where: { id },
			data: {
				name,
				description,
				price,
				images,
				slug: generateSlug(name),
				category: {
					connect: {
						id: categoryId
					}
				}
			}
		})
	}

	async delete(id: number) {
		return this.prismaService.product.delete({
			where: { id }
		})
	}
}
