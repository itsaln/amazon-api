import { Module } from '@nestjs/common'
import { UserService } from '@app/user/user.service'
import { UserController } from '@app/user/user.controller'
import { PrismaService } from '@app/prisma.service'

@Module({
	controllers: [UserController],
	providers: [UserService, PrismaService]
})
export class UserModule {}
