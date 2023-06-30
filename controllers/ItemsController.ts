import { Request, Response } from 'express';
import { items, users, items__genres, comments, categories, PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class ItemsController {

    async destroy(req: Request, res: Response) {
        const { id } = req.body;

        await prisma.items.deleteMany({
            where: {
                id: Number(id)
            }

        });

        res.redirect('/');
    }
    async home(req: Request, res: Response) {
        req.session.active = "genre";

        const items = await prisma.items.findMany({
            take: 5,
            where: {
                status: 'подписка'
            }
        })

        const genres = await prisma.genres.findMany({})
        const categories = await prisma.categories.findMany({})
        const users = await prisma.users.findMany({
            where: {
                name: String(req.session.name)
            }
        })
        if (users[0] != undefined) {
        }

        res.render('home', {
            'categories': categories,
            'genres': genres,
            'items': items,
            'users': users,

            auth: req.session.auth,
            searchMove: req.session.searchMove,
            admin: req.session.admin,
            status: req.session.status,
        });
    }

    async homeSearch(req: Request, res: Response) {
        const { name } = req.body;
        const items = await prisma.items.findMany({
            where: {
                name: name
            }
        });

        res.render('home', {
            auth: req.session.auth,
            admin: req.session.admin,
            'items': items
        });
    }

    async Add(req: Request, res: Response) {
        const attribute = await prisma.attribute.findMany({
            where: {
                id: 1
            },
            select: {
                attribute_values: {
                    select: {
                        relAttribute_value: {
                            select: {
                                name: true,
                                id:   true
                            }
                        }
                    }
                }
            }
        })
        let arr =[]
        for(let i = 0; i < attribute[0].attribute_values.length;i ++){
            // console.log(attribute[0].attribute_values[i].relAttribute_value.name)
            arr.push({
                name:attribute[0].attribute_values[i].relAttribute_value.name,
                 id:attribute[0].attribute_values[i].relAttribute_value.id
                })
        }
        const categories = await prisma.categories.findMany({})
        const items = await prisma.items.findMany({})
        res.render('items/create', {
            'genres': arr,
            'items': items,
            'categories': categories,
            auth: req.session.auth,
            admin: req.session.admin,
            status: req.session.status,
            category: req.session.category,
        });
    }
    async AddItems(req: Request, res: Response) {
        const { id, name, image, description, producer, actor, screenwriter, operator, regicer, year, age, country, status, video, treller } = req.body;

        let genres = await prisma.genres.findMany({})
        let mass = []
        let all = "";
        let one = "";
        for (let i = 0; i < genres.length; i++) {
            one = req.body.check

        }

        let arr = [];
        
        for (let i = 0; i < one.length; i++) {
            let attribute_values = await prisma.attribute_values.findMany({
                where: {
                    id: Number(one[i])
                }
            })
            arr.push(attribute_values[0].name)
        }

      
        
        const items = await prisma.items.create({
            data: {
                name: name,
                image: String(req.file?.originalname),
                description: description,
                producer: producer,
                actor: actor,
                screenwriter: screenwriter,
                operator: operator,
                regicer: regicer,
                type: Number(req.body.check__radio),
                country: country,
                age: age,
                year: String(year),
                genre: String(arr),
                status: status,
                video: video,
                treller: treller,
            }
        });

        for (let i = 0; i < one.length; i++) {
            let attribute_values = await prisma.attribute_values.findMany({
                where: {
                    id: Number(one[i])
                }
            })
            await prisma.items__genres.create({
                data: {
                    itemId: items.id,
                    genreId: attribute_values[0].id

                }
            })
        }

        req.session.status = status;

        res.status(200);
    }

    async basket(req: Request, res: Response) {
        const { id } = req.params
        const users = await prisma.users.findMany({
            where: {
                name: req.session.name
            },
            select: {
                Items: {
                    select: {
                        relItem: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        })
        let arr = []
        for (let i = 0; i < users[0].Items.length; i++) {
            arr.push(users[0].Items[i].relItem.id)
        }
        const items = await prisma.items.findMany({
            where: {
                id: {
                    in: arr
                }
            }
        })
        const categories = await prisma.categories.findMany({})
        res.render('cart/index', {
            name: req.session.name,
            auth: req.session.auth,
            admin: req.session.admin,
            status: req.session.status,
            category: req.session.category,
            'categories': categories,
            'items': items,
            'users': users

        });
    }
    async users(req: Request, res: Response) {
        const { name, password } = req.body;
        const categories = await prisma.categories.findMany({})
        const users = await prisma.users.findMany({
            where: {
                name: name,
                password: password
            }
        });
        res.render('users', {
            name: req.session.name,
            auth: req.session.auth,
            status: req.session.status,
            admin: req.session.admin,
            category: req.session.category,
            'categories': categories,
            'users': users
        });
    }
    async description(req: Request, res: Response) {
        const { id } = req.params;
        const { nameId, commentName } = req.body;


        const items = await prisma.items.findUnique({
            where: {
                id: Number(id)
            }

        });
        const categories = await prisma.categories.findMany({
        });
        await prisma.items.findMany({});


        await prisma.items.findMany({
            where: {
                name: nameId
            }

        });

        const comment = await prisma.comments.findMany({
            where: {
                move__id: Number(id),
                user__name: String(req.session.name),
            }

        });
        if (comment[0] != undefined) {

            req.session.mark = false

        } else {

            req.session.mark = true
        }

        // const {item__id} = req.body
        let arr = await prisma.comments.findMany({
            where: {
                move__id: Number(id)
            }
        })

        let summ = 0;
        let k = 0;

        for (let i = 0; i < arr.length; i++) {
            summ = summ + Number(arr[i].rate)
            k = i + 1;
        }
        let average = summ / k
        let rounded = Math.round(average * 10) / 10

        await prisma.comments.findMany({
            where: {
                user__name: String(commentName),
            }

        });

        res.render('items/show', {
            'items': items,

            'comments': comment,
            'categories': categories,
            number: Number(rounded),
            voices: k,
            auth: req.session.auth,
            password: req.session.password,
            status: req.session.status,
            name: req.session.name,
            admin: req.session.admin,
            mark: req.session.mark,

        });




    }



    async renderDes(req: Request, res: Response) {
        const { id } = req.params
        const items = await prisma.items.findMany({
            where: {
                id: Number(id)
            }
        })

        res.render('description', {

            auth: req.session.auth,
            status: req.session.status,
            admin: req.session.admin,
            mark: req.session.mark
        });
    }
    async editProfile(req: Request, res: Response) {
        const users = await prisma.users.findMany({
            where: {
                id: Number(req.session.userId)
            }
        })
        const categories = await prisma.categories.findMany({})
        res.render('account/editdata', {
            'categories': categories,
            users: users,
            auth: req.session.auth,
            status: req.session.status,
            admin: req.session.admin,
            mark: req.session.mark
        });
    }
    async editProfileName(req: Request, res: Response) {
        const users = await prisma.users.findMany({
            where: {
                id: Number(req.session.userId)
            }
        })
        const categories = await prisma.categories.findMany({})
        res.render('account/editName', {
            'categories': categories,
            users: users,
            auth: req.session.auth,
            status: req.session.status,
            admin: req.session.admin,
            mark: req.session.mark
        });
    }
    async editProfileAvatar(req: Request, res: Response) {
        const users = await prisma.users.findMany({
            where: {
                id: Number(req.session.userId)
            }
        })
        const categories = await prisma.categories.findMany({})
        res.render('account/editAvatar', {
            'categories': categories,
            users: users,
            auth: req.session.auth,
            status: req.session.status,
            admin: req.session.admin,
            mark: req.session.mark
        });
    }

    async editAvatar(req: Request, res: Response) {
        const { avatar } = req.body
        const users = await prisma.users.findMany({
            where: {
                id: Number(req.session.userId)
            }
        })
        await prisma.users.update({
            where: {
                id: Number(users[0].id)
            },
            data: {
                avatar: String(req.file?.originalname)
            }
        })
        const categories = await prisma.categories.findMany({})
        res.redirect('/profile')
    }
    async editPassword(req: Request, res: Response) {
        const { currentPassword, lastPassword } = req.body
        const users = await prisma.users.findMany({
            where: {
                id: Number(req.session.userId)
            }
        })
        if (currentPassword == req.session.password) {
            await prisma.users.update({
                where: {
                    id: Number(users[0].id)
                },
                data: {
                    password: lastPassword
                }
            })
            req.session.password = lastPassword
            res.redirect('/profile')
        } else {
            res.redirect('/editProfile')
        }
        const categories = await prisma.categories.findMany({})
    }

    async editName(req: Request, res: Response) {
        const { currentName, lastName } = req.body
        const users = await prisma.users.findMany({
            where: {
                id: Number(req.session.userId)
            }
        })
        if (currentName == req.session.name) {
            await prisma.users.update({
                where: {
                    id: Number(users[0].id)
                },
                data: {
                    name: lastName
                }
            })
            const data = await prisma.users.findMany({
                where: {
                    name: lastName
                }
            })
            req.session.name = lastName
            if (data[0] == undefined) {

                res.redirect('/editProfile')
            } else {
                res.redirect('/profile')
            }

        }

        const categories = await prisma.categories.findMany({})

    }

    async save__Video(req: Request, res: Response) {
        const { id } = req.params;

        const user = await prisma.users.findMany({
            where: {
                name: req.session.name
            }
        })
        const basket = await prisma.basket.findMany({
            where: {
                itemId: Number(id),
                usersId: Number(user[0].id)
            }
        })
        if (basket[0] == undefined) {
            await prisma.basket.create({
                data: {
                    itemId: Number(id),
                    usersId: Number(user[0].id)
                }
            })
        }


        res.redirect('/basket');
    }

    async delete__Video(req: Request, res: Response) {
        const { id } = req.params;
        const items = await prisma.items.findUnique({
            where: {
                id: Number(id)
            }
        })
        if (items != null) {
            const basket = await prisma.basket.deleteMany({
                where: {
                    itemId: Number(id),

                }
            });
        }

        res.redirect('/basket');
    }
    async delete__users(req: Request, res: Response) {
        const { id } = req.params;
        await prisma.users.deleteMany({
            where: {
                id: Number(id)
            }
        });
        res.redirect('/users');
    }
    async searchMove(req: Request, res: Response) {
        const { name } = req.body;
        const items = await prisma.items.findMany({
            where: {
                name: {
                    contains: name
                }
            }

        });
        if (items[0] != undefined) {
            req.session.searchMove = true
        } else {
            req.session.searchMove = false
        }
        const categories = await prisma.categories.findMany({})
        const genres = await prisma.genres.findMany({})

        res.render('search', {
            'categories': categories,
            'genres': genres,
            'items': items,
            searchMove: req.session.searchMove,
            auth: req.session.auth,
            admin: req.session.admin,
            active: req.session.active,
            status: req.session.status,
            mark: req.session.mark
        })
    }


    async delete__moves(req: Request, res: Response) {
        const { id } = req.params;
        const items = await prisma.items.findUnique({
            where: {
                id: Number(id)
            }
        });
        const genres = await prisma.genres.findMany({
        })
        // await prisma.items__genres.delete({
        //     // items_genres: {
        //     //     itemId: items.id,
        //     //     genreId: genres[0].id

        //     // }
        // })

        if (items != null) {
            await prisma.items__genres.deleteMany({
                where: {
                    itemId: Number(items.id)
                }
            })
            await prisma.items.delete({
                where: {
                    id: Number(id)
                }
            })
        }

        res.redirect(`/categories/${req.session.category}`)
    }


    async addGenre(req: Request, res: Response) {
        const categories = await prisma.categories.findMany({})

        res.render('items/create__genres', {
            name: req.session.name,
            auth: req.session.auth,
            status: req.session.status,
            admin: req.session.admin,
            category: req.session.category,
            'categories': categories,
        });
    }
    async addCategories(req: Request, res: Response) {

        const categories = await prisma.categories.findMany({})

        res.render('items/create__categories', {
            name: req.session.name,
            auth: req.session.auth,
            status: req.session.status,
            admin: req.session.admin,
            category: req.session.category,
            'categories': categories,

        });
    }
    async createGenre(req: Request, res: Response) {
        const { cartoonGenre, genre } = req.body;
        const categories = await prisma.categories.findMany({})
        await prisma.genres.create({
            data: {
                name: genre
            }
        })
        await prisma.cartoonGenres.create({
            data: {
                name: cartoonGenre
            }
        })
        res.redirect('/');
    }
    async createCategories(req: Request, res: Response) {
        const { categories } = req.body;
        await prisma.categories.create({
            data: {
                name: categories
            }
        })

        res.redirect('/');
    }
    async profile(req: Request, res: Response) {

        const users = await prisma.users.findMany({
            where: {
                id: Number(req.session.userId)
            }
        })

        const items = await prisma.items.findMany({})
        const basket = await prisma.basket.findMany({
            where: {
                usersId: Number(req.session.userId)
            }
        })
        let k = 0
        for (let i = 0; i < basket.length; i++) {
            k = k + 1
        }
        const comments = await prisma.comments.findMany({
            where: {
                user__name: String(req.session.name)
            }
        })

        let m = 0
        for (let i = 0; i < comments.length; i++) {
            m = m + 1
        }

        let type = ''
        if (users[0] != undefined) {
            if (users[0].type == 'Admin') {
                req.session.UserType = 'Администратор'
            } else {
                req.session.UserType = 'Пользователь'
            }
        }

        const categories = await prisma.categories.findMany({})
        res.render('account/profile', {
            'items': items,
            'categories': categories,
            'basket': basket,
            'users': users,
            'BasketCount': k,
            'commentsCount': m,
            'type': type,
            name: req.session.name,
            UserType: req.session.UserType,
            auth: req.session.auth,
            password: req.session.password,
            admin: req.session.admin
        });
    }
}



