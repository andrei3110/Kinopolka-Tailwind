"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemsController = void 0;
const client_1 = require("@prisma/client");
// import "./authorizationcontroller"
const prisma = new client_1.PrismaClient();
class ItemsController {
    destroy(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.body;
            yield prisma.items.deleteMany({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/');
        });
    }
    home(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            req.session.active = "genre";
            const items = yield prisma.items.findMany({
                take: 5,
                where: {
                    status: 'подписка'
                }
            });
            const attribute = yield prisma.attribute.findMany({
                where: {
                    id: 1
                },
                select: {
                    attribute_values: {
                        select: {
                            relAttribute_value: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        }
                    }
                }
            });
            let arr = [];
            for (let i = 0; i < attribute[0].attribute_values.length; i++) {
                arr.push({ name: attribute[0].attribute_values[i].relAttribute_value.name,
                    id: attribute[0].attribute_values[i].relAttribute_value.id });
            }
            const categories = yield prisma.categories.findMany({});
            const users = yield prisma.users.findMany({
                where: {
                    name: String(req.session.name)
                }
            });
            if (users[0] != undefined) {
            }
            res.render('home', {
                'categories': categories,
                'genres': arr,
                'items': items,
                'users': users,
                auth: req.session.auth,
                searchMove: req.session.searchMove,
                admin: req.session.admin,
                status: req.session.status,
            });
        });
    }
    homeSearch(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const items = yield prisma.items.findMany({
                where: {
                    name: name
                }
            });
            res.render('home', {
                auth: req.session.auth,
                admin: req.session.admin,
                'items': items
            });
        });
    }
    Add(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const attribute = yield prisma.attribute.findMany({
                where: {
                    id: 1
                },
                select: {
                    attribute_values: {
                        select: {
                            relAttribute_value: {
                                select: {
                                    name: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            });
            let arr = [];
            for (let i = 0; i < attribute[0].attribute_values.length; i++) {
                // console.log(attribute[0].attribute_values[i].relAttribute_value.name)
                arr.push({
                    name: attribute[0].attribute_values[i].relAttribute_value.name,
                    id: attribute[0].attribute_values[i].relAttribute_value.id
                });
            }
            const categories = yield prisma.categories.findMany({});
            const items = yield prisma.items.findMany({});
            res.render('items/create', {
                'genres': arr,
                'items': items,
                'categories': categories,
                auth: req.session.auth,
                admin: req.session.admin,
                status: req.session.status,
                category: req.session.category,
            });
        });
    }
    AddItems(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, image, description, producer, actor, screenwriter, operator, regicer, year, age, country, status, video, treller } = req.body;
            const attributes1 = yield prisma.attribute.findMany({
                where: {
                    id: 1
                },
                select: {
                    attribute_values: {
                        select: {
                            relAttribute_value: {
                                select: {
                                    id: true,
                                }
                            }
                        }
                    }
                }
            });
            let arr1 = [];
            for (let i = 0; i < attributes1[0].attribute_values.length; i++) {
                arr1.push(attributes1[0].attribute_values[i].relAttribute_value.id);
                console.log(attributes1[0].attribute_values[i]);
            }
            let mass = [];
            let all = "";
            let one;
            for (let i = 0; i < attributes1[0].attribute_values.length; i++) {
                one = req.body.check;
                console.log(one);
            }
            let arr = [];
            for (let i = 0; i < one.length; i++) {
                let attribute_values = yield prisma.attribute_values.findMany({
                    where: {
                        id: Number(one[i])
                    }
                });
                arr.push(attribute_values[0].name);
            }
            const items = yield prisma.items.create({
                data: {
                    name: name,
                    image: String((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname),
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
                let attribute_values = yield prisma.attribute_values.findMany({
                    where: {
                        id: Number(one[i])
                    }
                });
                yield prisma.items__attribute_values.create({
                    data: {
                        itemId: items.id,
                        attribute_valuesId: attribute_values[0].id
                    }
                });
            }
            req.session.status = status;
            res.status(200);
        });
    }
    basket(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const users = yield prisma.users.findMany({
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
            });
            let arr = [];
            for (let i = 0; i < users[0].Items.length; i++) {
                arr.push(users[0].Items[i].relItem.id);
            }
            const items = yield prisma.items.findMany({
                where: {
                    id: {
                        in: arr
                    }
                }
            });
            const categories = yield prisma.categories.findMany({});
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
        });
    }
    users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = req.body;
            const categories = yield prisma.categories.findMany({});
            const users = yield prisma.users.findMany({
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
        });
    }
    description(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nameId, commentName } = req.body;
            const items = yield prisma.items.findUnique({
                where: {
                    id: Number(id)
                }
            });
            const categories = yield prisma.categories.findMany({});
            yield prisma.items.findMany({});
            yield prisma.items.findMany({
                where: {
                    name: nameId
                }
            });
            const comment = yield prisma.comments.findMany({
                where: {
                    move__id: Number(id),
                    user__name: String(req.session.name),
                }
            });
            if (comment[0] != undefined) {
                req.session.mark = false;
            }
            else {
                req.session.mark = true;
            }
            // const {item__id} = req.body
            let arr = yield prisma.comments.findMany({
                where: {
                    move__id: Number(id)
                }
            });
            let summ = 0;
            let k = 0;
            for (let i = 0; i < arr.length; i++) {
                summ = summ + Number(arr[i].rate);
                k = i + 1;
            }
            let average = summ / k;
            let rounded = Math.round(average * 10) / 10;
            yield prisma.comments.findMany({
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
        });
    }
    renderDes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const items = yield prisma.items.findMany({
                where: {
                    id: Number(id)
                }
            });
            const comment = yield prisma.comments.findMany({
                where: {
                    move__id: Number(items[0].id)
                }
            });
            res.render('description', {
                'comment': comment,
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                mark: req.session.mark
            });
        });
    }
    editProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.users.findMany({
                where: {
                    id: Number(req.session.userId)
                }
            });
            const categories = yield prisma.categories.findMany({});
            res.render('account/editdata', {
                'categories': categories,
                users: users,
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                mark: req.session.mark
            });
        });
    }
    editProfileName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.users.findMany({
                where: {
                    id: Number(req.session.userId)
                }
            });
            const categories = yield prisma.categories.findMany({});
            res.render('account/editName', {
                'categories': categories,
                users: users,
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                mark: req.session.mark
            });
        });
    }
    editProfileAvatar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.users.findMany({
                where: {
                    id: Number(req.session.userId)
                }
            });
            const categories = yield prisma.categories.findMany({});
            res.render('account/editAvatar', {
                'categories': categories,
                users: users,
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                mark: req.session.mark
            });
        });
    }
    editAvatar(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { avatar } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    id: Number(req.session.userId)
                }
            });
            yield prisma.users.update({
                where: {
                    id: Number(users[0].id)
                },
                data: {
                    avatar: String((_a = req.file) === null || _a === void 0 ? void 0 : _a.originalname)
                }
            });
            const categories = yield prisma.categories.findMany({});
            res.redirect('/profile');
        });
    }
    editPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentPassword, lastPassword } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    id: Number(req.session.userId)
                }
            });
            if (currentPassword == req.session.password) {
                yield prisma.users.update({
                    where: {
                        id: Number(users[0].id)
                    },
                    data: {
                        password: lastPassword
                    }
                });
                req.session.password = lastPassword;
                res.redirect('/profile');
            }
            else {
                res.redirect('/editProfile');
            }
            const categories = yield prisma.categories.findMany({});
        });
    }
    editName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { currentName, lastName } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    id: Number(req.session.userId)
                }
            });
            if (currentName == req.session.name) {
                yield prisma.users.update({
                    where: {
                        id: Number(users[0].id)
                    },
                    data: {
                        name: lastName
                    }
                });
                const data = yield prisma.users.findMany({
                    where: {
                        name: lastName
                    }
                });
                req.session.name = lastName;
                if (data[0] == undefined) {
                    res.redirect('/editProfile');
                }
                else {
                    res.redirect('/profile');
                }
            }
            const categories = yield prisma.categories.findMany({});
        });
    }
    save__Video(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const user = yield prisma.users.findMany({
                where: {
                    name: req.session.name
                }
            });
            const basket = yield prisma.basket.findMany({
                where: {
                    itemId: Number(id),
                    usersId: Number(user[0].id)
                }
            });
            if (basket[0] == undefined) {
                yield prisma.basket.create({
                    data: {
                        itemId: Number(id),
                        usersId: Number(user[0].id)
                    }
                });
            }
            res.redirect('/basket');
        });
    }
    delete__Video(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const items = yield prisma.items.findUnique({
                where: {
                    id: Number(id)
                }
            });
            if (items != null) {
                const basket = yield prisma.basket.deleteMany({
                    where: {
                        itemId: Number(id),
                    }
                });
            }
            res.redirect('/basket');
        });
    }
    delete__users(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            yield prisma.users.deleteMany({
                where: {
                    id: Number(id)
                }
            });
            res.redirect('/users');
        });
    }
    searchMove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.body;
            const items = yield prisma.items.findMany({
                where: {
                    name: {
                        contains: name
                    }
                }
            });
            if (items[0] != undefined) {
                req.session.searchMove = true;
            }
            else {
                req.session.searchMove = false;
            }
            const categories = yield prisma.categories.findMany({});
            const attribute = yield prisma.attribute.findMany({
                where: {
                    id: 1
                },
                select: {
                    attribute_values: {
                        select: {
                            relAttribute_value: {
                                select: {
                                    name: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            });
            let arr = [];
            for (let i = 0; i < attribute[0].attribute_values.length; i++) {
                // console.log(attribute[0].attribute_values[i].relAttribute_value.name)
                arr.push({
                    name: attribute[0].attribute_values[i].relAttribute_value.name,
                    id: attribute[0].attribute_values[i].relAttribute_value.id
                });
            }
            res.render('search', {
                'categories': categories,
                'genres': arr,
                'items': items,
                searchMove: req.session.searchMove,
                auth: req.session.auth,
                admin: req.session.admin,
                active: req.session.active,
                status: req.session.status,
                mark: req.session.mark
            });
        });
    }
    delete__moves(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const items = yield prisma.items.findUnique({
                where: {
                    id: Number(id)
                }
            });
            const attribute = yield prisma.attribute.findMany({
                where: {
                    id: 1
                },
                select: {
                    attribute_values: {
                        select: {
                            relAttribute_value: {
                                select: {
                                    name: true,
                                    id: true
                                }
                            }
                        }
                    }
                }
            });
            let arr = [];
            for (let i = 0; i < attribute[0].attribute_values.length; i++) {
                // console.log(attribute[0].attribute_values[i].relAttribute_value.name)
                arr.push({
                    name: attribute[0].attribute_values[i].relAttribute_value.name,
                    id: attribute[0].attribute_values[i].relAttribute_value.id
                });
            }
            if (items != null) {
                yield prisma.items__attribute_values.deleteMany({
                    where: {
                        itemId: Number(items.id)
                    }
                });
                yield prisma.items.delete({
                    where: {
                        id: Number(id)
                    }
                });
            }
            res.redirect(`/categories/${req.session.category}`);
        });
    }
    addGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma.categories.findMany({});
            res.render('items/create__genres', {
                name: req.session.name,
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                category: req.session.category,
                'categories': categories,
            });
        });
    }
    addCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma.categories.findMany({});
            res.render('items/create__categories', {
                name: req.session.name,
                auth: req.session.auth,
                status: req.session.status,
                admin: req.session.admin,
                category: req.session.category,
                'categories': categories,
            });
        });
    }
    createGenre(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { cartoonGenre, genre } = req.body;
            const categories = yield prisma.categories.findMany({});
            yield prisma.attribute_values.create({
                data: {
                    name: genre
                }
            });
            const attribute_values = yield prisma.attribute_values.findMany({
                where: {
                    name: genre
                }
            });
            const attribute_attribute_values = yield prisma.attribute_attribute_values.create({
                data: {
                    attributeId: 1,
                    attribute_valueId: attribute_values[0].id
                }
            });
            res.redirect('/');
        });
    }
    createCategories(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categories } = req.body;
            yield prisma.categories.create({
                data: {
                    name: categories
                }
            });
            res.redirect('/');
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield prisma.users.findMany({
                where: {
                    id: Number(req.session.userId)
                }
            });
            const items = yield prisma.items.findMany({});
            const basket = yield prisma.basket.findMany({
                where: {
                    usersId: Number(req.session.userId)
                }
            });
            let k = 0;
            for (let i = 0; i < basket.length; i++) {
                k = k + 1;
            }
            const comments = yield prisma.comments.findMany({
                where: {
                    user__name: String(req.session.name)
                }
            });
            let m = 0;
            for (let i = 0; i < comments.length; i++) {
                m = m + 1;
            }
            let type = '';
            if (users[0] != undefined) {
                if (users[0].type == 'Admin') {
                    req.session.UserType = 'Администратор';
                }
                else {
                    req.session.UserType = 'Пользователь';
                }
            }
            const categories = yield prisma.categories.findMany({});
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
        });
    }
}
exports.ItemsController = ItemsController;
