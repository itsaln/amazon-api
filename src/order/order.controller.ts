import { Controller, Get } from '@nestjs/common'
import { OrderService } from '@app/order/order.service'
import { Auth } from '@app/auth/decorators/auth.decorator'
import { CurrentUser } from '@app/auth/decorators/user.decorator'

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Auth()
	@Get()
	getAll(@CurrentUser('id') userId: number) {
		return this.orderService.getAll(userId)
	}
}
