import { Module } from '@nestjs/common'
import { PaginationService } from '@app/pagination/pagination.service'
import { PaginationController } from '@app/pagination/pagination.controller'
import { PrismaService } from '@app/prisma.service'

@Module({
	controllers: [PaginationController],
	providers: [PaginationService, PrismaService]
})
export class PaginationModule {}
