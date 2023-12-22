import { Controller, Get } from '@nestjs/common'
import { StatisticsService } from '@app/statistics/statistics.service'
import { Auth } from '@app/auth/decorators/auth.decorator'
import { CurrentUser } from '@app/auth/decorators/user.decorator'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Auth()
	@Get('main')
	getMainStatistics(@CurrentUser('id') id: number) {
		return this.statisticsService.getMain(id)
	}
}
