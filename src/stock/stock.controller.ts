import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { StockService } from './stock.service';
import { StockInsertDto } from './dto/stock.insert.dto';
import { StockUpdateDto } from './dto/stock.update.dto';
import { JwtGuard } from 'src/auth/guards';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('/all')
  GetAllStock(){
    return this.stockService.GetAllStock()
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Post('/create')
  CreateStock(@Body() stock:StockInsertDto){
    return this.stockService.CreateStock(stock)
  }
  
  @UseGuards(JwtGuard,AdminGuard)
  @Patch('/update/:id')
  UpdateStock(@Param('id') id:string ,@Body() stock:StockUpdateDto){
    return this.stockService.UpdateStock(id,stock)
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete('/delete/:id')
  DeleteStock(@Param('id') id:string){
    return this.stockService.DeleteStock(id)
  }
}
