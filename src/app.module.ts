import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@app/auth/auth.module'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { PrismaService } from '@app/prisma.service'

@Module({
	imports: [ConfigModule.forRoot(), AuthModule],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
