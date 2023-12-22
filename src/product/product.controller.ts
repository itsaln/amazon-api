import { Controller } from '@nestjs/common'
import { ProductService } from '@app/product/product.service'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}
}
