import { Request, Response } from 'express';
import { items, users, basket, comments, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
import { Console } from 'console';

import { json } from 'stream/consumers';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class RatingController {
    async rating(req: Request, res: Response) {
        const {rate, text } = req.body;
        const { id } = req.params;
       
        await prisma.items.findUnique({
            where: {
                id: Number(id)
            }

        })
        
      
       
       await prisma.comments.create({
            data: {
                text: text,
                user__name: String(req.session.name),
                move__id: Number(id),
                rate: Number(rate),
            }
        })
        req.session.mark = false
       
        let arr = await prisma.comments.findMany({
            where:{
                move__id: Number(id)
            }
        })

        let summ = 0;
        let k = 0 ;

        for(let i = 0; i < arr.length; i++){
            summ = summ + Number(arr[i].rate)
            k = i + 1;
        }

        let average = summ / k
        let rounded = Math.round(average * 10) / 10

        res.status(200);
    }

}