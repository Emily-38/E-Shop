import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';


import { JwtGuard } from 'src/auth/guards';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/all')
  GetAllCategory(){
    return this.categoryService.GetAllCategory()
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Post('/create')
  CreateCategory(@Body() category:CategoryDto){
    return this.categoryService.CreateCategory(category)
  }
  
  @UseGuards(JwtGuard,AdminGuard)
  @Patch('/update/:id')
  updateCategory(@Param('id') id:string ,@Body() category:CategoryDto){
    return this.categoryService.UpdateCategory(id,category)
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete('/delete/:id')
  DeleteCategory(@Param('id') id:string){
    return this.categoryService.DeleteCategory(id)
  }
}
