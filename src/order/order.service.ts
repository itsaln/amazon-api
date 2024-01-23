import { Injectable } from '@nestjs/common'
import { PrismaService } from '@app/prisma.service'
import { OrderDto } from '@app/order/order.dto'
import { returnProductObject } from '@app/product/return-product.object'
import YooKassa from 'yookassa-ts/lib/yookassa'
import { PaymentMethodsEnum } from 'yookassa-ts/lib/types/PaymentMethod'
import { CurrencyEnum } from 'yookassa-ts/lib/types/Common'
import { PaymentStatusDto } from '@app/order/payment-status.dto'
import { EnumOrderStatus } from '@prisma/client'

const yooKassa = new YooKassa({
	shopId: process.env['SHOP_ID'],
	secretKey: process.env['PAYMENT_TOKEN']
})

@Injectable()
export class OrderService {
	constructor(private prismaService: PrismaService) {}

	async getAll() {
		return this.prismaService.order.findMany({
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				items: {
					include: {
						product: {
							select: returnProductObject
						}
					}
				}
			}
		})
	}

	async getByUserId(userId: number) {
		return this.prismaService.order.findMany({
			where: {
				userId
			},
			orderBy: {
				createdAt: 'desc'
			},
			include: {
				items: {
					include: {
						product: {
							select: returnProductObject
						}
					}
				}
			}
		})
	}

	async placeOrder(dto: OrderDto, userId: number) {
		const total = dto.items.reduce((acc, item) => {
			return acc + item.price * item.quantity
		}, 0)

		// TODO: Проверка на существование товара когда создаем заказ

		const order = await this.prismaService.order.create({
			data: {
				status: dto.status,
				items: {
					create: dto.items
				},
				total,
				user: {
					connect: {
						id: userId
					}
				}
			}
		})

		return await yooKassa.createPayment({
			capture: false,
			amount: {
				value: total.toFixed(2),
				currency: CurrencyEnum.USD
			},
			payment_method_data: {
				type: PaymentMethodsEnum.bank_card
			},
			confirmation: {
				type: 'redirect',
				confirmation_url: '',
				return_url: 'http//localhost:3000/thanks'
			},
			description: `Order #${order.id}`
		})
	}

	async updateStatus(dto: PaymentStatusDto) {
		if (dto.event === 'payment.waiting_for_capture') {
			return await yooKassa.capturePayment(dto.object.id, {
				value: '100',
				currency: CurrencyEnum.USD
			})
		}

		if (dto.event === 'payment.succeed') {
			const orderId = Number(dto.object.description.split('#')[1])

			await this.prismaService.order.update({
				where: {
					id: orderId
				},
				data: {
					status: EnumOrderStatus.PAYED
				}
			})

			return true
		}

		return true
	}
}
