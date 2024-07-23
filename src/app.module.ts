import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ProductModule } from './product/product.module';
import { StockModule } from './stock/stock.module';
import { ImageModule } from './image/image.module';
import { CategoryModule } from './category/category.module';
import { TypeModule } from './type/type.module';
import { UserModule } from './user/user.module';
import { CartContentModule } from './cart-content/cart-content.module';
import { CartModule } from './cart/cart.module';


@Module({
  imports: [PrismaModule, ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, EmailModule, ProductModule, StockModule, ImageModule, CategoryModule, TypeModule, UserModule, CartContentModule, CartModule],

})
export class AppModule {}
