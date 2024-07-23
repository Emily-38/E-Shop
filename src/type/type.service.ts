import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TypeDto } from './dto/type.dto';
import { contains } from 'class-validator';

@Injectable()
export class TypeService {
    constructor ( private prisma:PrismaService){}

    async GetAllType(){
        return this.prisma.type.findMany({
           
            select:{
                id:true, 
                name:true,
                createdAt: true
            }
        })
       
    }
    
    
    async CreateType(dto:TypeDto){
        const existingType=await this.prisma.type.findUnique({
            where:{
                name:dto.name,
            }
        })
    if(existingType){
        throw new ForbiddenException('This name existing');
    }
        const newType= await this.prisma.type.create({
            data:{
              name: dto.name
            }
        })
        return newType
    }
    
    async UpdateType(id:string, dto:TypeDto){
        const existingType=await this.prisma.type.findUnique({
            where:{
                id:id,
            }
        })
    if(!existingType||!existingType.id){
        throw new ForbiddenException('Unexisting id');
    }
    return this.prisma.type.update({
        where:{id:id},
        data:{...dto}
    })
    }
    
    async DeleteType(id: string){
        const existingType = await this.prisma.type.findUnique({
            where: {
              id: id,
            },
          });
      
          if (!existingType || !existingType.id) {
            throw new ForbiddenException('Unexisting id');
          }
          return this.prisma.type.delete({
            where:{
                id:id
            }
        
        })
        }

 async FilterType(query:string){
    return this.prisma.type.findMany({
        where:{
            id:query
        },
        select:{
            id:true,
            name:true,
            updatedAt:true,
            createdAt:true,
            Product:true
        }
    })

        }
       
       

}
