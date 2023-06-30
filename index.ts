import express, { Express, Request, Response } from 'express';
import path from 'path';
import multer from 'multer';
import session from 'express-session';
import { ItemsController } from './controllers/ItemsController';
import { RatingController } from './controllers/RatingController';
import { AuthController } from './controllers/AuthController';
import { CommentsController } from './controllers/CommentsController';
import { CategoriesController } from './controllers/CategoriesController';
import { SubscribeController } from './controllers/SubscribeController';

const app: Express = express();
const itemsController = new ItemsController();
const ratingController = new RatingController();
const authController = new AuthController();
const commentsController = new CommentsController();
const categoriesController = new CategoriesController();
const subscribeController = new SubscribeController();


app.use(express.static('public'));
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Инициализация сессии
declare module "express-session" {
  interface SessionData {
    auth: boolean,
    admin: boolean,
    searchMove: boolean,
    username: string,
    userId: Number,
    category: Number,
    mark: boolean,
    name: string,
    password: String,
    filter: Boolean,
    UserType: String,
    test: Number,
    count: Number,
    active: String,
    status: String,// статус фильма 
    subscription: String, // статус пользователя 
    interStatus: String // промежуточный статус пользователя


  }
};

app.use(session({ secret: "Secret", resave: false, saveUninitialized: true }));

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

app.get("/", (req: Request, res: Response) => {
  itemsController.home(req, res);
});
app.get("/categories/:id", (req: Request, res: Response) => {
  categoriesController.index(req, res);
});
app.get("/filters/:id", (req: Request, res: Response) => {
  categoriesController.filters(req, res);
});

app.get("/bySubscribe/:id", (req: Request, res: Response) => {
  subscribeController.BySubscribe(req, res);
});
app.get("/forfree/:id", (req: Request, res: Response) => {
  subscribeController.forFree(req, res);
});

//FILTERS//
app.get("/from/movies/:id", (req: Request, res: Response) => {
  categoriesController.movies(req, res);
});
app.get("/from/country/:name", (req: Request, res: Response) => {
  categoriesController.ByCountry(req, res);
});
app.get("/from/years/:name", (req: Request, res: Response) => {
  categoriesController.ByYear(req, res);
});
app.get("/types/free", (req: Request, res: Response) => {
  categoriesController.free(req, res);
});
app.get("/types/subscribe", (req: Request, res: Response) => {
  categoriesController.subscribe(req, res);
});
app.get("/from/cartoons/:id", (req: Request, res: Response) => {
  categoriesController.cartoons(req, res);
});

//AUTH//
app.get("/register", (req: Request, res: Response) => {
  authController.renderRegistration(req, res);
});
app.post("/register", (req: Request, res: Response) => {
  authController.registerForm(req, res);
});

app.get("/logout", (req: Request, res: Response) => {
  authController.logout(req, res);
});
// app.get("/login", (req: Request, res: Response) => {
//   authController.renderLogin(req, res);
// });
app.get("/registration", (req: Request, res: Response) => {
  authController.renderRegistration(req, res);
});

// app.get("/loginForm", (req: Request, res: Response) => {
//   authController.renderLogin(req, res);
// });
app.post("/login", (req: Request, res: Response) => {
  authController.login(req, res);
});
app.get("/enter", (req: Request, res: Response) => {
  authController.renderLogin(req, res);
});


app.get("/editProfile", (req: Request, res: Response) => {
  itemsController.editProfile(req, res);
});
app.get("/editName", (req: Request, res: Response) => {
  itemsController.editProfileName(req, res);
});
app.get("/editAvatar", (req: Request, res: Response) => {
  itemsController.editProfileAvatar(req, res);
});
app.get("/items/create", (req: Request, res: Response) => {
  itemsController.Add(req, res);
});

app.post("/arrange", (req: Request, res: Response) => {
  subscribeController.arrange(req, res);
});
app.post("/disarrange", (req: Request, res: Response) => {
  subscribeController.disarrange(req, res);
});
app.post("/searchAllFilms", (req: Request, res: Response) => {
  itemsController.homeSearch(req, res);
});
app.get("/subscribe", (req: Request, res: Response) => {
  subscribeController.RenderSubscribe(req, res);
});
app.get("/home", (req: Request, res: Response) => {
  itemsController.home(req, res);
});

app.get("/profile", (req: Request, res: Response) => {
  itemsController.profile(req, res);
});
app.get("/users", (req: Request, res: Response) => {
  itemsController.users(req, res);
});
app.post("/delete/users/:id", (req: Request, res: Response) => {
  itemsController.delete__users(req, res);
});
app.post("/delete/comment/:id", (req: Request, res: Response) => {
  commentsController.delete_Comment(req, res);
});
app.get("/cart", (req: Request, res: Response) => {
  itemsController.basket(req, res);
});
app.get("/addGenres", (req: Request, res: Response) => {
  itemsController.addGenre(req, res);
});
app.post("/addGenres", (req: Request, res: Response) => {
  itemsController.createGenre(req, res);
});
app.get("/addCategories", (req: Request, res: Response) => {
  itemsController.addCategories(req, res);
});
app.post("/addCategories", (req: Request, res: Response) => {
  itemsController.createCategories(req, res);
});
app.get("/description", (req: Request, res: Response) => {
  itemsController.renderDes(req, res);
});
app.post("/save__Video/:id", (req: Request, res: Response) => {
  itemsController.save__Video(req, res);
});
app.get("/save__Video", (req: Request, res: Response) => {
  itemsController.basket(req, res);
});
app.post("/delete__Video/:id", (req: Request, res: Response) => {
  itemsController.delete__Video(req, res);
});
app.get("/basket", (req: Request, res: Response) => {
  itemsController.basket(req, res);
});
app.get("/des__film/:id", (req: Request, res: Response) => {
  itemsController.description(req, res);
});
app.post("/rating/:id", (req: Request, res: Response) => {
  ratingController.rating(req, res);
});
app.post("/home", (req: Request, res: Response) => {
  itemsController.searchMove(req, res);
});
app.post("/delete__movies/:id", (req: Request, res: Response) => {
  itemsController.delete__moves(req, res);
});

app.post("/search/byGenre/:id", (req: Request, res: Response) => {
  categoriesController.search(req, res);
});
app.post("/editPassword", (req: Request, res: Response) => {
  itemsController.editPassword(req, res);
});
app.post("/editName", (req: Request, res: Response) => {
  itemsController.editName(req, res);
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/editAvatar", upload.single("avatar"), (req: Request, res: Response) => {
  itemsController.editAvatar(req, res);
});
app.post("/AddItems", upload.single("file"), (req: Request, res: Response) => {
  itemsController.AddItems(req, res);
});

app.get('/api/v1/comments/:id/show', (req: Request, res: Response) => {
  commentsController.show(req, res);
});

