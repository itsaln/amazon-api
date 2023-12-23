import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ProductService } from '@app/product/product.service'
import { GetAllProductDto } from '@app/product/dto/get-all-product.dto'
import { Auth } from '@app/auth/decorators/auth.decorator'
import { ProductDto } from '@app/product/dto/product.dto'

@Controller('products')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get()
	getAll(@Query() queryDto: GetAllProductDto) {
		return this.productService.getAll(queryDto)
	}

	@Get('similar/:id')
	getSimilar(@Param('id') id: string) {
		return this.productService.getSimilar(+id)
	}

	@Get('by-slug/:slug')
	getBySlug(@Param('slug') slug: string) {
		return this.productService.bySlug(slug)
	}

	@Get('by-category/:categorySlug')
	getByCategory(@Param('categorySlug') categorySlug: string) {
		return this.productService.byCategory(categorySlug)
	}

	@Auth()
	@Get(':id')
	getById(@Param('id') id: string) {
		return this.productService.byId(+id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Post()
	create() {
		return this.productService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	update(@Param('id') id: string, @Body() dto: ProductDto) {
		return this.productService.update(+id, dto)
	}

	@HttpCode(200)
	@Auth()
	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.productService.delete(+id)
	}
}
