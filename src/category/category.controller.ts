import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CategoryService } from '@app/category/category.service'
import { Auth } from '@app/auth/decorators/auth.decorator'
import { CategoryDto } from '@app/category/category.dto'

@Controller('categories')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	getAll() {
		return this.categoryService.getAll()
	}

	@Get('by-slug/:slug')
	getBySlug(@Param('slug') slug: string) {
		return this.categoryService.bySlug(slug)
	}

	@Auth()
	@Get(':id')
	getById(@Param('id') id: string) {
		return this.categoryService.byId(+id)
	}

	@HttpCode(200)
	@Auth()
	@Post()
	create() {
		return this.categoryService.create()
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Put(':id')
	update(@Param('id') id: string, @Body() dto: CategoryDto) {
		return this.categoryService.update(+id, dto)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Auth()
	@Delete(':id')
	delete(@Param('id') id: string) {
		return this.categoryService.delete(+id)
	}
}
