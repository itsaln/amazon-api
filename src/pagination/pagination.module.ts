import { Module } from '@nestjs/common'
import { PaginationService } from '@app/pagination/pagination.service'

@Module({
	providers: [PaginationService],
	exports: [PaginationService]
})
export class PaginationModule {}
