import { path } from 'app-root-path'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@app/auth/auth.module'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { PrismaService } from '@app/prisma.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { UserModule } from '@app/user/user.module'
import { ProductModule } from '@app/product/product.module'
import { ReviewModule } from '@app/review/review.module'
import { CategoryModule } from '@app/category/category.module'
import { OrderModule } from '@app/order/order.module'
import { PaginationModule } from '@app/pagination/pagination.module'
import { StatisticsModule } from '@app/statistics/statistics.module'

@Module({
	imports: [
		ServeStaticModule.forRoot({
			rootPath: `${path}/uploads`,
			serveRoot: '/uploads'
		}),
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
