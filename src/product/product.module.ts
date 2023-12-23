import { Module } from '@nestjs/common'
import { ProductService } from '@app/product/product.service'
import { ProductController } from '@app/product/product.controller'
import { PrismaService } from '@app/prisma.service'
import { PaginationService } from '@app/pagination/pagination.service'

@Module({
	controllers: [ProductController],
	providers: [ProductService, PrismaService, PaginationService],
})
export class ProductModule {}
