import { Module } from '@nestjs/common'
import { CategoryService } from '@app/category/category.service'
import { CategoryController } from '@app/category/category.controller'
import { PrismaService } from '@app/prisma.service'

@Module({
	controllers: [CategoryController],
	providers: [CategoryService, PrismaService],
	exports: [CategoryService]
})
export class CategoryModule {}
