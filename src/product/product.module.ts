import { Module } from '@nestjs/common'
import { ProductService } from '@app/product/product.service'
import { ProductController } from '@app/product/product.controller'
import { PrismaService } from '@app/prisma.service'
import { PaginationService } from '@app/pagination/pagination.service'
import { PaginationModule } from '@app/pagination/pagination.module'
import { CategoryModule } from '@app/category/category.module'

@Module({
	controllers: [ProductController],
	providers: [ProductService, PrismaService, PaginationService],
	imports: [PaginationModule, CategoryModule]
})
export class ProductModule {}
