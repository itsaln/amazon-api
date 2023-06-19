import { Module } from '@nestjs/common'
import { AppController } from '@app/app.controller'
import { AppService } from '@app/app.service'
import { AuthModule } from '@app/auth/auth.module'

@Module({
	controllers: [AppController],
	providers: [AppService],
	imports: [AuthModule]
})
export class AppModule {}
