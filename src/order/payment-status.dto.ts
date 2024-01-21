import { CurrencyEnum } from 'yookassa-ts/lib/types/Common'

class AmountPayment {
	value: string
	currency: CurrencyEnum
}

class ObjectPayment {
	id: string
	status: string
	amount: AmountPayment
	payment_method: {
		id: number
		type: string
		saved: boolean
		title: string
		card: object
	}
	description: string
	created_at: string
	expires_at: string
}

export class PaymentStatusDto {
	event:
		| 'payment.succeed'
		| 'payment.waiting_for_capture'
		| 'payment.canceled'
		| 'refund.succeed'
	type: string
	object: ObjectPayment
}
