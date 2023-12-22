import { Module } from '@nestjs/common'
import { StatisticsService } from '@app/statistics/statistics.service'
import { StatisticsController } from '@app/statistics/statistics.controller'
import { PrismaService } from '@app/prisma.service'
import { UserService } from '@app/user/user.service'

@Module({
	controllers: [StatisticsController],
	providers: [StatisticsService, PrismaService, UserService]
})
export class StatisticsModule {}
