import { ForbiddenException, Injectable } from '@nestjs/common';
import { CartContent, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartContentDto } from './dto/CartContent.insert.dto';

@Injectable()
export class CartContentService {
    constructor ( private prisma:PrismaService){}
    

    async GetAllcartContent(user:User){

        const existingUser=await this.prisma.cart.findUnique({
            where:{
                userId:user.id,
            }
        })
        if(!existingUser||!existingUser.id){
                 throw new ForbiddenException('Unexisting cart');
             }
        return this.prisma.cartContent.findMany({
            where:{ 
             
            CartId:existingUser.id
            },
                orderBy:{
                createdAt:'desc'
            },
           
            select:{
                id:true, 
                stock:true,
                
               
            }
        })
       
    }
    
    
    async CreateCartContent(dto:CartContentDto,user:User){
        const existingCartContent=await this.prisma.cart.findUnique({
                    where:{
                        userId:user.id,
                    }
                })
                if(!existingCartContent||!existingCartContent.id){
                         throw new ForbiddenException('Unexisting cart');
                     }
        const newStock= await this.prisma.cartContent.create({
            data:{ 
                CartId:existingCartContent.id,
                stock:{create:[

                {   productId:dto.productId,
                    quantity:dto.quantity,
                    size:dto.size
                }
                ]},

               
            }
        })
        return newStock
    }
    
    // async UpdateCartContent(id:string, dto:CartContentDto){
    //     const existingCartContent=await this.prisma.stock.findUnique({
    //         where:{
    //             id:id,
    //         }
    //     })
    // if(!existingCartContent||!existingCartContent.id){
    //     throw new ForbiddenException('Unexisting id');
    // }
    // return this.prisma.stock.update({
    //     where:{id:id},
    //     data:{...dto}
    // })
    // }
    
    async DeleteCartContent(id: string){
        const existingCartContent = await this.prisma.cartContent.findUnique({
            where: {
              id: id,
            },
          });
      
          if (!existingCartContent || !existingCartContent.id) {
            throw new ForbiddenException('Unexisting id');
          }
          return this.prisma.cartContent.delete({
            where:{
                id:id
            }
        
        })
        }
    
    
}
