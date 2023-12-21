import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@app/auth/auth.module'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { PrismaService } from '@app/prisma.service'
import { UserModule } from '@app/user/user.module'
import { ProductModule } from '@app/product/product.module'
import { ReviewModule } from '@app/review/review.module'
import { CategoryModule } from '@app/category/category.module'
import { OrderModule } from '@app/order/order.module'
import { PaginationModule } from '@app/pagination/pagination.module'
import { StatisticsModule } from '@app/statistics/statistics.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		ProductModule,
		ReviewModule,
		CategoryModule,
		OrderModule,
		PaginationModule,
		StatisticsModule
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
