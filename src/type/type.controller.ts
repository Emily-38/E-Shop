import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { TypeService } from './type.service';
import { JwtGuard } from 'src/auth/guards';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { TypeDto } from './dto/type.dto';
import { TypeFilterDto } from './dto/type.filter.dto';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Get('/all')
  GetAllType(){
    return this.typeService.GetAllType()
  }

@Get('/:id')
FilterType(@Param('id') id: string){
return this.typeService.FilterType(id)
}



  @UseGuards(JwtGuard,AdminGuard)
  @Post('/create')
  CreateType(@Body() type:TypeDto){
    return this.typeService.CreateType(type)
  }
  
  @UseGuards(JwtGuard,AdminGuard)
  @Patch('/update/:id')
  updateType(@Param('id') id:string ,@Body() type: TypeDto){
    return this.typeService.UpdateType(id,type)
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete('/delete/:id')
  DeleteType(@Param('id') id:string){
    return this.typeService.DeleteType(id)
  }

}
