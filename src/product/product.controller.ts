import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductInsertDto } from './dto/product.insert.dto';
import { ProductUpdateDto } from './dto/product.update.dto';
import { JwtGuard } from 'src/auth/guards';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { ProductFilterDto } from './dto/product.filter.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/all')
  GetAllProduct(){
    return this.productService.GetAllProduct()
  }
  
  @Get('/by-id/:id')
  ProductById(@Param('id') id:string){
    return this.productService.ProductById(id)
  }

  @Get('/search')
  async globalSearch(@Query('query') query: string){ 
  
  
   return this.productService.globalSearch(query)
  }

@Get('/filter/:name')
FilterProduct(@Param('name') name: string, @Query()  filter:ProductFilterDto ){
 
return this.productService.FilterProduct(filter.minPrice, filter.maxPrice,name,filter.category )
}


  @UseGuards(JwtGuard,AdminGuard)
  @Post('/create')
  CreateProduct(@Body() product:ProductInsertDto){
    return this.productService.CreateProduct(product)
  }
  
  @UseGuards(JwtGuard,AdminGuard)
  @Patch('/update/:id')
  UpdateProduct(@Param('id') id:string ,@Body() product:ProductUpdateDto){
    return this.productService.UpdateProduct(id,product)
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete('/delete/:id')
  DeleteProduct(@Param('id') id:string){
    return this.productService.DeleteProduct(id)
  }


}
