import { Request, Response } from 'express';
import { items, users, basket, comments,categories, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
import { addLog } from '../logs/addLog';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class SubscribeController {

    async RenderSubscribe(req: Request, res: Response) {
        const items = await prisma.items.findMany({})
        const categories = await prisma.categories.findMany({})
        res.render('account/subscription', {
            auth: req.session.auth,
            active: req.session.active,
            admin: req.session.admin,
            status: req.session.status,
         
            category: req.session.category,
            subscription: req.session.subscription,
            'categories':categories


        });
    }
    async arrange(req: Request, res: Response) {

        if (req.session.auth == true) {
            const categories = await prisma.categories.findMany({})
            const genres = await prisma.genres.findMany({})
            const items = await prisma.items.findMany({})
            const users = await prisma.users.findMany({
                where: {
                    name: String(req.session.name),
                },
            })
            
            await prisma.users.updateMany({
                where: {
                    name: String(req.session.name)
                },
                data: {
                    status: 'Subscription',
                },   
                
            })
            req.session.subscription = 'Subscription'
            addLog(` ${req.session.name} оформил подписку`)

            res.render('home', {
                'items':items,
                'genres':genres,
                'categories':categories,
                'users': users,
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                status: req.session.status,
             
                category: req.session.category,
                subscription: req.session.subscription,

            });
        } else {
            const categories = await prisma.categories.findMany({})
            const items = await prisma.items.findMany({})
            req.session.subscription = undefined;
            res.render('auth/login', {
                'items':items,
                'categories':categories,
                auth: req.session.auth,
                active: req.session.active,
                subscription: req.session.subscription,
                admin: req.session.admin,
                status: req.session.status,
       
                category: req.session.category,

            });
        }

    }
    async disarrange(req: Request, res: Response) {
        
        if (req.session.auth == true) {
            const categories = await prisma.categories.findMany({})
            const genres = await prisma.genres.findMany({})
            const items = await prisma.items.findMany({})
            const users = await prisma.users.findMany({
                where: {
                    name: String(req.session.name)
                },
            })
            await prisma.users.updateMany({
                where: {
                    name: String(req.session.name)
                },
                data: {
                    status: 'Free',
                },   
            })
            req.session.subscription = 'Free'
            addLog(` ${req.session.name} отказался от подписки`)

            res.render('home', {
                'categories':categories,
                'users': users,
                'items':items,
                'genres':genres,
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                status: req.session.status,
       
                category: req.session.category,
                subscription: req.session.subscription,

            });
        } else {
            const categories = await prisma.categories.findMany({})
            req.session.subscription = undefined;
            res.render('auth/login', {
                'categories':categories,
                auth: req.session.auth,
                active: req.session.active,
                subscription: req.session.subscription,
                admin: req.session.admin,
                status: req.session.status,
                category: req.session.category,

            });
        }
    }
    async BySubscribe(req: Request, res: Response) {
        const {id} = req.params
        if(req.session.subscription == 'Subscription'){
            const items = await prisma.items.findMany({
                where:{
                    id:Number(id)
                }
            })
            
            res.render('watchZone', {
                'items' : items,
                auth: req.session.auth,
                active: req.session.active,
                subscription: req.session.subscription,
                admin: req.session.admin,
                status: req.session.status,
                category: req.session.category,
            });
        }else{
            res.render('subscribe', {
                auth: req.session.auth,
                active: req.session.active,
                subscription: req.session.subscription,
                admin: req.session.admin,
                status: req.session.status,
                category: req.session.category,
            });
        }
        
    }
    async forFree(req: Request, res: Response) {
        const {id} = req.params
        const items = await prisma.items.findMany({
            where:{
                id:Number(id)
            }
        })
            res.render('watchZone', {
                'items': items,
                auth: req.session.auth,
                active: req.session.active,
                subscription: req.session.subscription,
                admin: req.session.admin,
                status: req.session.status,
                category: req.session.category,
            });
        
        
    }
}



