import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductInsertDto } from './dto/product.insert.dto';
import { title } from 'process';
import { ProductUpdateDto } from './dto/product.update.dto';

@Injectable()
export class ProductService {
constructor ( private prisma:PrismaService){}

async GetAllProduct(){
    return this.prisma.product.findMany({
        orderBy:{
            createdAt:'desc'
        },
        select:{
            id:true, 
            image:true,
            description:true,
            CategoryId:true,
            Stock:true,
            title: true,
            price:true,
            typeId:true

        }
    })
   
}


async CreateProduct(dto:ProductInsertDto){
    const existingProduct= await this.prisma.product.findUnique({
        where:{
            title:dto.title,
        }
     })
    if(existingProduct){
        throw new ForbiddenException('This product existing');
    }
    
    const newProduct= await this.prisma.product.create({
        data:{
            description:dto.description,
            title:dto.title,
            price:dto.price,
            image:dto.image,
            typeId:dto.typeId,
            CategoryId: dto.categoryId
        }
    })
    return newProduct
}

async UpdateProduct(id:string, dto:ProductUpdateDto){
    const existingProduct=await this.prisma.product.findUnique({
        where:{
            id:id,
        }
    })
if(!existingProduct||!existingProduct.id){
    throw new ForbiddenException('Unexisting id');
}
return this.prisma.product.update({
    where:{id:id},
    data:{...dto}
})
}

async DeleteProduct(id: string){
    const existingProduct = await this.prisma.product.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!existingProduct || !existingProduct.id) {
        throw new ForbiddenException('Unexisting id');
      }
      return this.prisma.product.delete({
        where:{
            id:id
        }
    
    })
    }

    async ProductById(query:string){
        return this.prisma.product.findMany({
            where:{
                id:query
            },
            select:{
                id:true,
                title:true,
                description:true,
                image: true,
                price:true,
                Stock:true,
                updatedAt:true,
                createdAt:true,
                
            }
        })
     }

           async FilterProduct(minPrice, maxPrice,Type, category ){
            
            if(!minPrice){minPrice=0}
            if(!maxPrice){maxPrice=100}
            return await this.prisma.product.findMany({
                where:{ 
                    AND:[
                        { 
                            price: {
                                lte:Number(maxPrice),
                           }
                        }, {
                                    price:{
                                        gte:Number(minPrice)
                                    }  
                        },
                        {
                             CategoryId:category
                                    },
                                    {
                                    typeId:Type 
                                 }
                                
                            ]
                },
                select:{
                    id:true,
                    title:true,
                    price:true,
                    image:true,
                    CategoryId:true,
                    typeId:true
                    
                }
            }) 
        
        }

        async globalSearch(query: string) {
            
             return await this.prisma.product.findMany({
              where: {
                OR: [ 
                  { title:{contains:query}},
                  { type: {name:{contains:query}}},
                  { Category: {name: {contains:query}} },
                ],
              }
            });
          }
   

}
