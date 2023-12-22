import { Module } from '@nestjs/common'
import { ReviewService } from '@app/review/review.service'
import { ReviewController } from '@app/review/review.controller'
import { PrismaService } from '@app/prisma.service'

@Module({
	controllers: [ReviewController],
	providers: [ReviewService, PrismaService]
})
export class ReviewModule {}
