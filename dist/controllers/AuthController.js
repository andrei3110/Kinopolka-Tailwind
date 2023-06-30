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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const client_1 = require("@prisma/client");
const addLog_1 = require("../logs/addLog");
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma = new client_1.PrismaClient();
class AuthController {
    registerForm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma.categories.findMany({});
            const { name, password } = req.body;
            req.session.auth = undefined;
            const users = yield prisma.users.findMany({
                where: {
                    name
                }
            });
            if (users[0] != undefined) {
                req.session.auth = false;
                res.redirect('/register');
            }
            else if (users[0] == '') {
                res.redirect('/register');
                req.session.auth = false;
            }
            else {
                const saltRounds = 10;
                const users = yield prisma.users.create({
                    data: {
                        name: name,
                        password: bcrypt_1.default.hashSync(password, saltRounds),
                        status: 'Free',
                        type: 'User',
                        avatar: 'default_avatar.jpg'
                    }
                });
                req.session.subscription = 'Free';
                req.session.name = name;
                req.session.userId = users.id;
                req.session.password = password;
                req.session.auth = true;
                if (users.type == "Admin") {
                    req.session.admin = true;
                }
                else {
                    req.session.admin = false;
                }
                (0, addLog_1.addLog)(` ${req.session.name} зарегистрировал аккаунт`);
                res.redirect('/home');
            }
        });
    }
    renderRegistration(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma.categories.findMany({});
            req.session.auth == undefined;
            res.render('auth/registration', {
                'categories': categories,
                auth: req.session.auth,
                password: req.session.password,
                admin: req.session.admin,
            });
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, password } = req.body;
            const users = yield prisma.users.findMany({
                where: {
                    name: name
                }
            });
            if (users[0] != undefined) {
                if (bcrypt_1.default.compareSync(password, String(users[0].password))) {
                    req.session.name = name;
                    req.session.userId = users[0].id;
                    req.session.password = req.body.password;
                    if (users[0].type == "Admin") {
                        req.session.auth = true;
                        req.session.admin = true;
                    }
                    else {
                        req.session.admin = false;
                        req.session.auth = true;
                    }
                    if (req.session.name != "" || req.session.password != "") {
                        (0, addLog_1.addLog)(` ${req.session.name} вошел в аккаунт`);
                        const user = yield prisma.users.findMany({
                            where: {
                                name: String(req.session.name),
                            }
                        });
                        if (user[0].status == 'Subscription') {
                            req.session.subscription = 'Subscription';
                        }
                        else {
                            req.session.subscription = 'Free';
                        }
                        res.redirect('/home');
                    }
                    else {
                        req.session.auth = false;
                        res.redirect('/enter');
                        req.session.name = undefined;
                    }
                }
            }
            else {
                req.session.auth = false;
                res.redirect('/enter');
                req.session.name = undefined;
            }
            ;
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            (0, addLog_1.addLog)(` ${req.session.name} вышел из аккаунта`);
            req.session.auth = undefined;
            req.session.name = undefined;
            res.redirect('/enter');
        });
    }
    renderLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categories = yield prisma.categories.findMany({});
            res.render('auth/login', {
                'categories': categories,
                auth: req.session.auth,
                password: req.session.password,
                admin: req.session.admin,
            });
        });
    }
}
exports.AuthController = AuthController;
