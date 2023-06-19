import { NestFactory } from '@nestjs/core'
import { AppModule } from '@app/app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true })

  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT || 5200)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

let ignore = bootstrap()
