import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { userUpdateDto } from './dto/update.user.dto';

@Injectable()
export class UserService {
    constructor ( private prisma:PrismaService){}

async GetAllUser(){
    return this.prisma.user.findMany({
        orderBy:{
            createdAt:'desc'
        },
        select:{
            id:true, 
            firstName:true,
            lastName:true,
            email:true,
            adress:true,
            role:true,
            isActive:true
        }
    })
   
}

async UserById(query:string){
    return this.prisma.user.findMany({
        where:{
            id:query
        },
        select:{
            id:true, 
            firstName:true,
            lastName:true,
            email:true,
            adress:true,
            role:true,
            isActive:true
            
        }
    })
 }

async UpdateUser(id:string, dto:userUpdateDto){
    const existingUser = await this.prisma.user.findUnique({
        where:{
            id:id,
        }
    })
if(!existingUser||!existingUser.id){
    throw new ForbiddenException('Unexisting id');
}
return this.prisma.user.update({
    where:{id:id},
    data:{...dto}
})
}

async DeleteUser(id: string){
    const existingUser = await this.prisma.user.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!existingUser || !existingUser.id) {
        throw new ForbiddenException('Unexisting id');
      }
      return this.prisma.user.delete({
        where:{
            id:id
        }
    
    })
    }

    async globalSearch(query: string) {
            
        return await this.prisma.user.findMany({
         where: {
           OR: [ 
             { lastName:{contains:query}},
             {email:{contains:query}},
             { firstName: {contains:query} },
           ],
         }
       });
     }


}