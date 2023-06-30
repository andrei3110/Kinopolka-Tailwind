import { Request, Response } from 'express';
import { items, users, basket, items__genres, genres, comments,  categories, cartoonGenres,PrismaClient } from '@prisma/client';
import { validateHeaderValue } from 'http';
// import "./authorizationcontroller"
const prisma: PrismaClient = new PrismaClient();

export class CategoriesController {
    async index(req: Request, res: Response) {
        const { id } = req.params;

        let categories = await prisma.categories.findMany({});
        let items = await prisma.items.findMany({
            where: {
                type: Number(id),
            }
        });
        const attribute = await prisma.attribute.findMany({})
        const genres = await prisma.genres.findMany({})
        const cartoons = await prisma.cartoonGenres.findMany({})
        req.session.category = Number(id);
        res.render('types/index', {
            auth: req.session.auth,
            active: req.session.active,
            admin: req.session.admin,
            status: req.session.status,
            category: req.session.category,
            count: req.session.count,
            'attribute':attribute,
            'items': items,
            'categories': categories,
            'genres': genres,
            'cartoonGenres': cartoons
        });
    }

    async movies(req: Request, res: Response) {
        const { id } = req.params;
        
        const genres = await prisma.genres.findMany({
            where: {
                id: Number(id)
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
            },

        })

        let arr = []
        for (let i = 0; i < genres[0].Items.length; i++) {

            arr.push(genres[0].Items[i].relItem.id)


        }
        for (let i = 0; i < arr.length; i++) {

        }
        const items = await prisma.items.findMany({
            where: {
                id: {
                    in: arr,

                },
                type: Number(req.session.category)
            }
        })
        const categories = await prisma.categories.findMany({});
        const attribute = await prisma.attribute.findMany({})

        res.render('types/movies', {
            auth: req.session.auth,
            active: req.session.active,
            status: req.session.status,
            admin: req.session.admin,

            category: req.session.category,
            count: req.session.count,
            'categories': categories,
            'items': items,
            'attribute':attribute,
            'genres': genres,
        })

    }

    async search(req: Request, res: Response) {
        const { id } = req.params;

        const genre = await prisma.genres.findMany({

            where: {
                id: Number(id)
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
            },

        })

        let arr = []
        for (let i = 0; i < genre[0].Items.length; i++) {

            arr.push(genre[0].Items[i].relItem.id)

        }
        for (let i = 0; i < arr.length; i++) {

        }
        //    const items = await prisma.items.findMany({})
        if (arr.length != 0) {
            req.session.searchMove = true
        } else {
            req.session.searchMove = false
        }
        const items = await prisma.items.findMany({
            where: {
                id: {
                    in: arr,
                },
            }
        })
        const genres = await prisma.genres.findMany({})
        const categories = await prisma.categories.findMany({});
        const attribute = await prisma.attribute.findMany({})
        res.render('search', {
            'categories': categories,
            'items': items,
            'genre': genre,
            'attribute':attribute,
            'genres':genres,
            auth: req.session.auth,
            active: req.session.active,
            status: req.session.status,
            admin: req.session.admin,
            searchMove: req.session.searchMove,
            category: req.session.category,
            count: req.session.count,
        })

    }

    async cartoons(req: Request, res: Response) {
        const { name } = req.params;

        const genres = await prisma.cartoonGenres.findMany({
            where: {
                name
            }
        });

        const count = await prisma.items.count({
            where: {
                genre: {
                    contains: name
                },
                type: Number(req.session.category)
            }
        });
        if (count > 0) {
            let n = Math.ceil(count / 4)
            req.session.count = Math.ceil(count / 4)
            let itemsPerPage = 4

            let page = Number(req.query.page)
            if (!page) page = 1;
            if (page > n) page = n;
            let pages = itemsPerPage * (page - 1)


            const items = await prisma.items.findMany({
                skip: pages,
                take: itemsPerPage,
                where: {
                    genre: {
                        contains: name
                    },
                    type: Number(req.session.category)

                }

            });

            let k = 0;
            
            for (let i = 0; i < items.length; i++) {
                k = k + 1
            }
            const categories = await prisma.categories.findMany({})
            const attribute = await prisma.attribute.findMany({})
            res.render('types/movies', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                category: req.session.category,
                'items': items,
                'attribute':attribute,
                'cartoonGenres': genres,
                'categories': categories,
            });
        } else {
            const items = await prisma.items.findMany({
                where: {
                    genre: {
                        contains: name
                    },
                    type: Number(req.session.category)

                }

            });
            const categories = await prisma.categories.findMany({})
            const attribute = await prisma.attribute.findMany({})
            res.render('types/movies', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                category: req.session.category,
                'items': items,
                'cartoonGenres': genres,
                'attribute':attribute,
                'categories': categories,
            });
        }

    }

    async searchFilms(req: Request, res: Response) {

        const { name } = req.body;
        req.session.searchMove = false
        const items = await prisma.items.findMany({
            where: {
                genre: {
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
            'genres': genres,
            'categories': categories,
            'items': items,
            searchMove: req.session.searchMove,
            auth: req.session.auth,
            status: req.session.status,
            count: req.session.count,
            active: req.session.active,
            admin: req.session.admin,
            mark: req.session.mark
        })
    }

    async ByYear(req: Request, res: Response) {

        const { name } = req.params;
        const currentType = Number(req.session.category)
        const count = await prisma.items.count({
            where: {
                year:String(name),
                type: Number(req.session.category)

            }
        });
        if (count > 0) {
            let n = Math.ceil(count / 4)
            req.session.count = Math.ceil(count / 4)
            let itemsPerPage = 4

            let page = Number(req.query.page)
            if (!page) page = 1;
            if (page > n) page = n;
            let pages = itemsPerPage * (page - 1)


            const items = await prisma.items.findMany({

                skip: pages,
                take: itemsPerPage,
                where: {
                    year: String(name),
                    type: Number(req.session.category)

                }

            });
            const attribute = await prisma.attribute.findMany({})
            const categories = await prisma.categories.findMany({})
            let k = 0;
            for (let i = 0; i < items.length; i++) {
                k = k + 1
            }

            res.render('types/movies', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                category: req.session.category,
                'items': items,
                'attribute':attribute,
                'categories': categories

            });
        } else {
            const attribute = await prisma.attribute.findMany({})
            const categories = await prisma.categories.findMany({})
            const items = await prisma.items.findMany({
                where: {
                    year:String(name),
                    type: Number(req.session.category)

                }

            });

            res.render('types/movies', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                category: req.session.category,
                'attribute':attribute,
                'items': items,
                'categories': categories

            });
        }
    }

   

    async byFree(req: Request, res: Response) {

        req.session.active = "free";
        const items = await prisma.items.findMany({
            where: {
                status: 'бесплатно'
            }
        })

        const categories = await prisma.categories.findMany({})

        res.render('types/movies', {
            auth: req.session.auth,
            active: req.session.active,
            status: req.session.status,
            admin: req.session.admin,
            category: req.session.category,
            count: req.session.count,
            'categories': categories,
            'items': items,
        });
    }

    async onPaid(req: Request, res: Response) {
        req.session.active = "paid";

        const items = await prisma.items.findMany({
            where: {
                status: 'подписка'
            }
        })
        const categories = await prisma.categories.findMany({})

        res.render('types/movies', {
            auth: req.session.auth,
            active: req.session.active,
            status: req.session.status,
            admin: req.session.admin,
            category: req.session.category,
            count: req.session.count,
            'categories': categories,
            'items': items,
        });
    }


    async ByCountry(req: Request, res: Response) {

        const { name } = req.params;
        const currentType = Number(req.session.category)
        const count = await prisma.items.count({
            where: {
                country: {
                    contains: name
                },
                type: currentType
            }
        });
        if(count > 0){
            let n = Math.ceil(count / 4)
            req.session.count = Math.ceil(count / 4)
            let itemsPerPage = 4

            let page = Number(req.query.page)
            if (!page) page = 1;
            if (page > n) page = n;
            let pages = itemsPerPage * (page - 1)
            
            const items = await prisma.items.findMany({
                skip: pages,
                take: itemsPerPage,
                where: {
                    country: {
                        contains: name
                    },
                    type: currentType
                }

            });
    
            const attribute = await prisma.attribute.findMany({})
            const categories = await prisma.categories.findMany({})

            res.render('types/movies', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                category: req.session.category,
                'attribute':attribute,
                'items': items,
                'categories': categories

            });
        }else{
            const items = await prisma.items.findMany({
                where: {
                    country: {
                        contains: name
                    },
                    type: currentType
                }

            });
    
            const attribute = await prisma.attribute.findMany({})
            const categories = await prisma.categories.findMany({})

            res.render('types/movies', {
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                category: req.session.category,
                'attribute':attribute,
                'items': items,
                'categories': categories

            }); 
        }
        
    }


    async subscribe(req: Request, res: Response) {

        const items = await prisma.items.findMany({
            where: {
                status: 'подписка'
            }
        })
        
        const categories = await prisma.categories.findMany({})
        res.render('types/movies', {
            auth: req.session.auth,
            active: req.session.active,
            status: req.session.status,
            admin: req.session.admin,
            category: req.session.category,
            count: req.session.count,
            'categories': categories,
            'items': items,
        });
    }


    async free(req: Request, res: Response) {

        const items = await prisma.items.findMany({
            where: {
                status: 'бесплатно'
            }
        })

        const categories = await prisma.categories.findMany({})

        res.render('types/movies', {
            auth: req.session.auth,
            active: req.session.active,
            status: req.session.status,
            admin: req.session.admin,
            category: req.session.category,
            count: req.session.count,
            'categories': categories,
            'items': items,
        });
    }

    async filters(req: Request, res: Response) {

        const { id } = req.params;

        const attributes = await prisma.attribute.findMany({
            where:{
                id:Number(id),
            },
            select:{
                attribute_values:{
                    select:{
                        relAttribute_value:{
                            select:{
                                id:true
                            }
                        }
                    }
                }
            }
        })
        let arr = []
     
        for(let i = 0; i <attributes[0].attribute_values.length;i ++){   
            arr.push(attributes[0].attribute_values[i].relAttribute_value.id)
        }
        const attribute_values = await prisma.attribute_values.findMany({
            where:{
                id:{
                    in: arr
                }
            }
        })
        const attributeRoute = await prisma.attribute.findMany({
            where:{
                id:Number(id)
            }
        })
        const categories = await prisma.categories.findMany({})
        const attributeBar = await prisma.attribute.findMany({})
        const genres = await prisma.genres.findMany({})
        const cartoonGenres = await prisma.cartoonGenres.findMany({})
        const items = await prisma.items.findMany()

            res.render(`types/${attributeRoute[0].tag}`, {
                'attributes':attributes,
                'categories': categories,
                'items':items,
                'attribute_values':attribute_values,
                'attribute':attributeBar,
                'cartoonGenres':cartoonGenres,
                'genres': genres,
                auth: req.session.auth,
                filter: req.session.filter,
                status: req.session.status,
                admin: req.session.admin,
                active: req.session.active,
                count: req.session.count,
                category: req.session.category,
            });
     

    }
}



