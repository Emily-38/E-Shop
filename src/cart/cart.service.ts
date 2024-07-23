import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
    constructor ( private prisma:PrismaService){}

    async GetAllcart(user){
        const finduser=await this.prisma.user.findFirst({
            where:{
                id:user.id,
                }
              })
                if (!finduser || !finduser.id) {
                  throw new ForbiddenException('Invalid crendentials');
                }
        return this.prisma.cart.findMany({
            where:{ userId:finduser.id},
            orderBy:{
                createdAt:'desc'
            },
            select:{
                id:true, 
                cartContent:true
               
            }
        })
       
    }
    
    
    async CreateCart(dto:CartDto, token:string){
      
       const user=await this.prisma.user.findFirst({
        where:{
            token:token,
            }
          })
            if (!user || !user.id) {
              throw new ForbiddenException('Invalid crendentials');
            }


        const newCart= await this.prisma.cart.create({
            data:{
               userId:user.id,
               statut:dto.statut
                
            }
        })
        return newCart
    }
    
    async UpdateCart(id:string, dto:CartDto){
        const existingCart=await this.prisma.cart.findUnique({
            where:{
                id:id,
            }
        })
    if(!existingCart||!existingCart.id){
        throw new ForbiddenException('Unexisting id');
    }
    return this.prisma.cart.update({
        where:{id:id},
        data:{...dto}
    })
    }
    
    async DeleteCart(id: string){
        const existingCart = await this.prisma.cart.findUnique({
            where: {
              id: id,
            },
          });
      
          if (!existingCart || !existingCart.id) {
            throw new ForbiddenException('Unexisting id');
          }
          return this.prisma.cart.delete({
            where:{
                id:id
            }
        
        })
        }
}
