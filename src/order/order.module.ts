import { Module } from '@nestjs/common'
import { OrderService } from '@app/order/order.service'
import { OrderController } from '@app/order/order.controller'
import { PrismaService } from '@app/prisma.service'

@Module({
	controllers: [OrderController],
	providers: [OrderService, PrismaService]
})
export class OrderModule {}
