import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { addLog } from '../logs/addLog';
import bcrypt from "bcrypt";

const prisma: PrismaClient = new PrismaClient();

export class AuthController {
    async registerForm(req: Request, res: Response) {
        const categories =  await prisma.categories.findMany({})
        const { name, password } = req.body;
        req.session.auth = undefined;
        const users = await prisma.users.findMany({
            where: {
                name
            }
        });
        
        if (users[0] != undefined) {
            req.session.auth = false;
            res.redirect('/register')

        } else if (users[0] == '') {
            res.redirect('/register')
            req.session.auth = false;
        } else {
            const saltRounds = 10;
            const users = await prisma.users.create({
                data: {
                    name: name,
                    password: bcrypt.hashSync(password, saltRounds),
                    status: 'Free',
                    type:'User',
                    avatar: 'default_avatar.jpg'
                }
            });
            
            req.session.subscription = 'Free'
            req.session.name = name;
            req.session.userId = users.id
            req.session.password = password;
            req.session.auth = true
            if (users.type == "Admin") {
                req.session.admin = true
            } else {
                req.session.admin = false
            }
            addLog(` ${req.session.name} зарегистрировал аккаунт`)
            res.redirect('/home');
        }
    }

    async renderRegistration(req: Request, res: Response) {
        const categories =  await prisma.categories.findMany({})
        req.session.auth == undefined;
        res.render('auth/registration', {
            'categories':categories,
            auth: req.session.auth,
            password: req.session.password,
            admin: req.session.admin,
        });
    }

    async login(req: Request, res: Response) {
        const { name, password } = req.body;

        const users = await prisma.users.findMany({
            where: {
                name:name
            }
        });
        if (users[0] != undefined) {
            if ( bcrypt.compareSync(password, String(users[0].password))) {
            req.session.name = name
            req.session.userId = users[0].id
           
   
            req.session.password = req.body.password
          

            
            if (users[0].type == "Admin") {
                req.session.auth = true;
                req.session.admin = true

            } else {
                req.session.admin = false
                req.session.auth = true;
            }
            if (req.session.name != "" || req.session.password != "") {
                addLog(` ${req.session.name} вошел в аккаунт`)
                const user = await prisma.users.findMany({
                    where: {
                        name: String(req.session.name),
                    }
                });

                if (user[0].status == 'Subscription') {
                    req.session.subscription = 'Subscription'
                } else {
                    req.session.subscription = 'Free'
                }
                res.redirect('/home');
                
            } else {
                req.session.auth = false;
                res.redirect('/enter')
                req.session.name = undefined
            }
        }
        } else {
            req.session.auth = false;
            res.redirect('/enter')
            req.session.name = undefined
        };
    }

    async logout(req: Request, res: Response) {
        addLog(` ${req.session.name} вышел из аккаунта`)
        req.session.auth = undefined
        req.session.name = undefined
        res.redirect('/enter')

    }

    async renderLogin(req: Request, res: Response) {
        const categories =  await prisma.categories.findMany({})
        res.render('auth/login', {
            'categories':categories,   
            auth: req.session.auth,
            password: req.session.password,
            admin: req.session.admin,
        });
    }
}



