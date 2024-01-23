import { Controller, Get } from '@nestjs/common'
import { StatisticsService } from '@app/statistics/statistics.service'
import { Auth } from '@app/auth/decorators/auth.decorator'

@Controller('statistics')
export class StatisticsController {
	constructor(private readonly statisticsService: StatisticsService) {}

	@Auth('admin')
	@Get('main')
	getMainStatistics() {
		return this.statisticsService.getMain()
	}
}
