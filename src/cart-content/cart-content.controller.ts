import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CartContentService } from './cart-content.service';
import { CartContentDto } from './dto/CartContent.insert.dto';
import { JwtGuard } from 'src/auth/guards';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';

@Controller('cart-content')
export class CartContentController {
  constructor(private readonly cartContentService: CartContentService) {}

  @UseGuards(JwtGuard)
  @Get('/all')
  GetAllCartContent( @GetUser() user:User){
    return this.cartContentService.GetAllcartContent(user)
  }

  @UseGuards(JwtGuard)
  @Post('/create')
  CreateCartContent(@Body() CartContent:CartContentDto, @GetUser() user:User){
    return this.cartContentService.CreateCartContent(CartContent,user)
  }
  
  // @UseGuards(JwtGuard)
  // @Patch('/update/:id')
  // updateCategory(@Param('id') id:string ,@Body() CartContent:CartContentDto){
  //   return this.cartContentService.UpdateCartContent(id,CartContent)
  // }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  DeleteCartContent(@Param('id') id:string){
    return this.cartContentService.DeleteCartContent(id)
  }
}
