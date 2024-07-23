import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StockInsertDto } from './dto/stock.insert.dto';
import { StockUpdateDto } from './dto/stock.update.dto';

@Injectable()
export class StockService {
    constructor ( private prisma:PrismaService){}

async GetAllStock(){
    return this.prisma.stock.findMany({
        orderBy:{
            createdAt:'desc'
        },
        select:{
            id:true, 
            size:true,
            
            quantity:true,
            productId: true,
        }
    })
   
}


async CreateStock(dto:StockInsertDto){
   
    const newStock= await this.prisma.stock.create({
        data:{
            size:dto.size,
            quantity:dto.quantity,
            productId: dto.productId
        }
    })
    return newStock
}

async UpdateStock(id:string, dto:StockUpdateDto){
    const existingStock=await this.prisma.stock.findUnique({
        where:{
            id:id,
        }
    })
if(!existingStock||!existingStock.id){
    throw new ForbiddenException('Unexisting id');
}
return this.prisma.stock.update({
    where:{id:id},
    data:{...dto}
})
}

async DeleteStock(id: string){
    const existingStock = await this.prisma.stock.findUnique({
        where: {
          id: id,
        },
      });
  
      if (!existingStock || !existingStock.id) {
        throw new ForbiddenException('Unexisting id');
      }
      return this.prisma.stock.delete({
        where:{
            id:id
        }
    
    })
    }

}
