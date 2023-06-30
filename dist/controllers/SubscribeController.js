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
exports.SubscribeController = void 0;
const client_1 = require("@prisma/client");
const addLog_1 = require("../logs/addLog");
// import "./authorizationcontroller"
const prisma = new client_1.PrismaClient();
class SubscribeController {
    RenderSubscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const items = yield prisma.items.findMany({});
            const categories = yield prisma.categories.findMany({});
            res.render('account/subscription', {
                auth: req.session.auth,
                active: req.session.active,
                admin: req.session.admin,
                status: req.session.status,
                category: req.session.category,
                subscription: req.session.subscription,
                'categories': categories
            });
        });
    }
    arrange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.auth == true) {
                const categories = yield prisma.categories.findMany({});
                const genres = yield prisma.genres.findMany({});
                const items = yield prisma.items.findMany({});
                const users = yield prisma.users.findMany({
                    where: {
                        name: String(req.session.name),
                    },
                });
                yield prisma.users.updateMany({
                    where: {
                        name: String(req.session.name)
                    },
                    data: {
                        status: 'Subscription',
                    },
                });
                req.session.subscription = 'Subscription';
                (0, addLog_1.addLog)(` ${req.session.name} оформил подписку`);
                res.render('home', {
                    'items': items,
                    'genres': genres,
                    'categories': categories,
                    'users': users,
                    auth: req.session.auth,
                    active: req.session.active,
                    admin: req.session.admin,
                    status: req.session.status,
                    category: req.session.category,
                    subscription: req.session.subscription,
                });
            }
            else {
                const categories = yield prisma.categories.findMany({});
                const items = yield prisma.items.findMany({});
                req.session.subscription = undefined;
                res.render('auth/login', {
                    'items': items,
                    'categories': categories,
                    auth: req.session.auth,
                    active: req.session.active,
                    subscription: req.session.subscription,
                    admin: req.session.admin,
                    status: req.session.status,
                    category: req.session.category,
                });
            }
        });
    }
    disarrange(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (req.session.auth == true) {
                const categories = yield prisma.categories.findMany({});
                const genres = yield prisma.genres.findMany({});
                const items = yield prisma.items.findMany({});
                const users = yield prisma.users.findMany({
                    where: {
                        name: String(req.session.name)
                    },
                });
                yield prisma.users.updateMany({
                    where: {
                        name: String(req.session.name)
                    },
                    data: {
                        status: 'Free',
                    },
                });
                req.session.subscription = 'Free';
                (0, addLog_1.addLog)(` ${req.session.name} отказался от подписки`);
                res.render('home', {
                    'categories': categories,
                    'users': users,
                    'items': items,
                    'genres': genres,
                    auth: req.session.auth,
                    active: req.session.active,
                    admin: req.session.admin,
                    status: req.session.status,
                    category: req.session.category,
                    subscription: req.session.subscription,
                });
            }
            else {
                const categories = yield prisma.categories.findMany({});
                req.session.subscription = undefined;
                res.render('auth/login', {
                    'categories': categories,
                    auth: req.session.auth,
                    active: req.session.active,
                    subscription: req.session.subscription,
                    admin: req.session.admin,
                    status: req.session.status,
                    category: req.session.category,
                });
            }
        });
    }
    BySubscribe(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (req.session.subscription == 'Subscription') {
                const items = yield prisma.items.findMany({
                    where: {
                        id: Number(id)
                    }
                });
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
            else {
                res.render('subscribe', {
                    auth: req.session.auth,
                    active: req.session.active,
                    subscription: req.session.subscription,
                    admin: req.session.admin,
                    status: req.session.status,
                    category: req.session.category,
                });
            }
        });
    }
    forFree(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const items = yield prisma.items.findMany({
                where: {
                    id: Number(id)
                }
            });
            res.render('watchZone', {
                'items': items,
                auth: req.session.auth,
                active: req.session.active,
                subscription: req.session.subscription,
                admin: req.session.admin,
                status: req.session.status,
                category: req.session.category,
            });
        });
    }
}
exports.SubscribeController = SubscribeController;
