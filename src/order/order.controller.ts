import {
	Body,
	Controller,
	Get,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { OrderService } from '@app/order/order.service'
import { Auth } from '@app/auth/decorators/auth.decorator'
import { CurrentUser } from '@app/auth/decorators/user.decorator'
import { OrderDto } from '@app/order/order.dto'
import { PaymentStatusDto } from '@app/order/payment-status.dto'

@Controller('orders')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Auth('admin')
	@Get()
	getAll() {
		return this.orderService.getAll()
	}

	@Auth()
	@Get('by-user')
	getByUserId(@CurrentUser('id') userId: number) {
		return this.orderService.getByUserId(userId)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	placeOrder(@Body() dto: OrderDto, @CurrentUser('id') userId: number) {
		return this.orderService.placeOrder(dto, userId)
	}

	@HttpCode(200)
	@Post('status')
	updateStatus(@Body() dto: PaymentStatusDto) {
		return this.orderService.updateStatus(dto)
	}
}
