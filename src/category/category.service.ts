import { ForbiddenException, Injectable } from '@nestjs/common';
import { CategoryDto } from './dto/category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {

    constructor ( private prisma:PrismaService){}

async GetAllCategory(){
    return this.prisma.category.findMany({
       
        select:{
            id:true, 
            name:true,
            createdAt: true
        }
    })
   
}


async CreateCategory(dto:CategoryDto){
    const existingCategory=await this.prisma.category.findUnique({
        where:{
            name:dto.name,
        }
    })
if(existingCategory){
    throw new ForbiddenException('This name existing');
}
    const newCategory= await this.prisma.category.create({
        data:{
          name: dto.name
        }
    })
    return newCategory
}

async UpdateCategory(id:string, dto:CategoryDto){
    const existingCategory=await this.prisma.category.findUnique({
        where:{
            id:id,
        }
    })
if(!existingCategory||!existingCategory.id){
    throw new ForbiddenException('Unexisting id');
}
return this.prisma.category.update({
    where:{id:id},
    data:{...dto}
})
}

async DeleteCategory(id: string){
    const existingCategory = await this.prisma.category.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!existingCategory || !existingCategory.id) {
        throw new ForbiddenException('Unexisting id');
      }
      return this.prisma.category.delete({
        where:{
            id:id
        }
    
    })
    }



}




