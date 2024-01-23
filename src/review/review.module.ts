import { Module } from '@nestjs/common'
import { ReviewService } from '@app/review/review.service'
import { ReviewController } from '@app/review/review.controller'
import { PrismaService } from '@app/prisma.service'
import { ProductService } from '@app/product/product.service'
import { ProductModule } from '@app/product/product.module'
import { PaginationModule } from '@app/pagination/pagination.module'
import { CategoryModule } from '@app/category/category.module'

@Module({
	controllers: [ReviewController],
	providers: [ReviewService, PrismaService, ProductService],
	imports: [ProductModule, PaginationModule, CategoryModule]
})
export class ReviewModule {}
