import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ReviewService } from '@app/review/review.service'
import { Auth } from '@app/auth/decorators/auth.decorator'
import { ReviewDto } from '@app/review/review.dto'
import { CurrentUser } from '@app/auth/decorators/user.decorator'

@Controller('reviews')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Get()
	getAll() {
		return this.reviewService.getAll()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post('leave/:productId')
	leaveReview(
		@CurrentUser('id') id: number,
		@Param('productId') productId: string,
		@Body() dto: ReviewDto
	) {
		return this.reviewService.create(id, +productId, dto)
	}

	@Get('average-by-product/:productId')
	getAverageByProduct(@Param('productId') productId: string) {
		return this.reviewService.getAverageValueByProductId(+productId)
	}
}
