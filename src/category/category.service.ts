import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '@app/prisma.service'
import { returnCategoryObject } from '@app/category/return-category.object'
import { CategoryDto } from '@app/category/category.dto'
import { generateSlug } from '@app/utils/generate-slug'

@Injectable()
export class CategoryService {
	constructor(private prismaService: PrismaService) {}

	async byId(id: number) {
		const category = await this.prismaService.category.findUnique({
			where: {
				id
			},
			select: returnCategoryObject
		})

		if (!category) throw new NotFoundException('Category not found')

		return category
	}

	async bySlug(slug: string) {
		const category = await this.prismaService.category.findUnique({
			where: {
				slug
			},
			select: returnCategoryObject
		})

		if (!category) throw new NotFoundException('Category not found')

		return category
	}

	async getAll() {
		return this.prismaService.category.findMany({
			select: returnCategoryObject
		})
	}

	async create() {
		return this.prismaService.category.create({
			data: {
				name: '',
				slug: ''
			}
		})
	}

	async update(id: number, dto: CategoryDto) {
		return this.prismaService.category.update({
			where: { id },
			data: {
				name: dto.name,
				slug: generateSlug(dto.name)
			}
		})
	}

	async delete(id: number) {
		return this.prismaService.category.delete({
			where: { id }
		})
	}
}
