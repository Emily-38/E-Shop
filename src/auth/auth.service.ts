import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignupDto } from './dto/auth.signup.dto';
import * as argon from  'argon2'


import { EmailService } from 'src/email/email.service';
import { SigninDto } from './dto/auth.signin.dto';

@Injectable()
export class AuthService {
    constructor(
        private prisma:PrismaService,
        private jwt:JwtService,
        private config:ConfigService,
        private emailService:EmailService
        
    ){}

    async signUp(dto:SignupDto){
        const existUser=await this.prisma.user.findUnique({
            where:{
                email: dto.email
            }
        })
        if(existUser){
            throw new ForbiddenException('email already taken ')

        }
        const hash=await argon.hash(dto.password)
        const activationToken= await argon.hash(`${dto.email}+${dto.lastName}`)
        const cleanToken= activationToken.replaceAll('/','-')
        console.log(cleanToken)
        const user= await this.prisma.user.create({
            data:{
                email:dto.email,
                password: hash,
                lastName: dto.lastName,
                firstName:dto.firstName,
                adress:dto.adress,
                role: 'user',
               token: cleanToken
                
            }
        })
        
        await this.emailService.sendUserConfirmation(user, cleanToken);
        
    }

    async signIn(dto: SigninDto) {
        const user = await this.prisma.user.findUnique({
          where: {
            email: dto.email,
          },
        });
        if (!user) {
          throw new ForbiddenException('Invalid crendentials');
        }
    
        const isValidPassword = await argon.verify(user.password, dto.password);
        if (!isValidPassword) {
          throw new ForbiddenException('Invalid crendentials');
        }
        const token = await this.signToken(user.id)
        return {
          token,
          isActive:user.isActive,
          role: user.role
        };
      }
    
async validateAccount(token:string){
const user=await this.prisma.user.findFirst({
    where:{
        token:token,
        }
      })
        if (!user) {
          throw new ForbiddenException('Invalid crendentials');
        }
      await this.prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          isActive:true,
          token: null
        }
      })
return 'compte activer'

}

    async signToken(userId: string): Promise<{ access_token: string }> {
        const payload = {
          sub: userId,
        };
    
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
          expiresIn: '30d',
          secret: secret,
        });
    
        return {
          
          access_token: token,
        };
      }
}
