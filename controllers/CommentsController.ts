import { Request, Response } from 'express';
import { items, users, basket, comments, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class CommentsController {

    // async delete__comment(req: Request, res: Response) {
    //     const { id } = req.params;
    //     const { move__id, text, item__id ,itemsID, user__name, nameId, commentId, ratingId } = req.body;

    //     const items = await prisma.items.findUnique({
    //         where: {
    //             id: Number(id)  
    //         }
           
    //     });
    //     await prisma.comments.deleteMany({
    //         where: {
    //             id: Number(commentId),

    //         }
    //     });
        
    //     const comment = await prisma.comments.findMany({
    //         where: {
    //             move__id:Number(id),
    //         }
           
    //     });
    //     let arr = await prisma.rating.findMany({
    //         where:{
    //             item__id: Number(id)
    //         }
    //     })
    //     await prisma.items.findMany({})
    //     const rating = await prisma.rating.deleteMany({
    //         where: {
    //             name:String(req.session.name),
    //             item__id:Number(itemsID)
    //         }
    //     });
        
    //     let summ = 0;
    //     let k = 0 ;
        
    //     for(let i = 0; i < arr.length; i++){
    //         summ = summ + arr[i].rate;
    //         k = i + 1;
    //     }
    //     let average = summ / k
    //     let rounded = Math.round(average * 10) / 10
    
      
    //     res.redirect(`/des__film/${itemsID}`);
    // }
    async delete_Comment(req: Request, res: Response) {
        const {itemsID} = req.body;
        const {id} = req.params
        const comments = await prisma.comments.delete({
            where:{
                id:Number(id)
            }
        });
        
       
        res.redirect(`/des__film/${itemsID}`)
    }    
    async show(req: Request, res: Response) {
        const {id} = req.params
        const comments = await prisma.comments.findMany({
            where:{
                move__id:Number(id)
            }
        });
        let i = 55;
        let mas= [i,comments]
       
        res.status(200).json(mas);
    }    
}



