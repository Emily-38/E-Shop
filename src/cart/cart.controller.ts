import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JwtGuard } from 'src/auth/guards';
import { CartDto } from './dto/cart.dto';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtGuard)
  @Get('/all')
  GetAllCart(@GetUser() user:User){
    return this.cartService.GetAllcart(user)
  }

 
  @Post('/create/:token')
  CreateCart(@Param('token') token:string, @Body() Cart:CartDto){
    return this.cartService.CreateCart(Cart, token)
  }
  
  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateCategory(@Param('id') id:string ,@Body() Cart:CartDto){
    return this.cartService.UpdateCart(id,Cart)
  }

  @UseGuards(JwtGuard)
  @Delete('/delete/:id')
  DeleteCart(@Param('id') id:string){
    return this.cartService.DeleteCart(id)
  }
}
