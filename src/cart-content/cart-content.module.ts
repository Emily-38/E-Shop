import { Module } from '@nestjs/common';
import { CartContentService } from './cart-content.service';
import { CartContentController } from './cart-content.controller';

@Module({
  controllers: [CartContentController],
  providers: [CartContentService],
})
export class CartContentModule {}
