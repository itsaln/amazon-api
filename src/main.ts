import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app/app.module'
import { PrismaService } from '@/app/prisma.service'

async function bootstrap() {
	const app = await NestFactory.create(AppModule, { cors: true })

	const prismaService = app.get(PrismaService)
	await prismaService.enableShutdownHooks(app)

	app.setGlobalPrefix('api')
	await app.listen(process.env.PORT || 5200)
	console.log(`Application is running on: ${await app.getUrl()}`)
}

let ignore = bootstrap()
