import { Body, Controller, Delete, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { userUpdateDto } from './dto/update.user.dto';
import { JwtGuard } from 'src/auth/guards';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtGuard,AdminGuard)
  @Get('/all')
  GetAllUser(){
    return this.userService.GetAllUser()
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Get('/by-id/:id')
  UserById(@Param('id') id:string){
    return this.userService.UserById(id)
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Get('/search')
  async globalSearch(@Query('query') query: string){ 
   return this.userService.globalSearch(query)
  }

  @UseGuards(JwtGuard)
  @Patch('/update/:id')
  updateType(@Param('id') id:string ,@Body() user: userUpdateDto){
    return this.userService.UpdateUser(id,user)
  }

  @UseGuards(JwtGuard,AdminGuard)
  @Delete('/delete/:id')
  DeleteUser(@Param('id') id:string ){
    return this.userService.DeleteUser(id)
  }
}
