import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers//CreateTagController";
import { ensureAdmin } from './middlewares/ensureAdmin'
import { CreateComplimentController } from "./controllers/CreateComplimentController"
import { AuthenticateUserController } from "./controllers/AutenticateUserController"
import { ListUserController } from "./controllers/ListUserController"
import { ListTagsController } from "./controllers/ListTagsController"
import { ListUserReceiverComplimentsController } from "./controllers/ListUserReceiverController"
import { ListUserSendComplimentController } from "./controllers/ListUserSendComplimentController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController()
const createComplimentService = new CreateComplimentController()
const authenticateUserController = new AuthenticateUserController()
const listUserController = new ListUserController()
const listTagsController = new ListTagsController()
const listUserReceiverComplimentsController = new ListUserReceiverComplimentsController()
const listUserSendComplimentController = new ListUserSendComplimentController()

router.post("/users", createUserController.handle);
router.get('/users', ensureAuthenticated, listUserController.handler)
router.get('/users/compliments/receive', ensureAuthenticated, listUserReceiverComplimentsController.handler)
router.get('/users/compliments/send', ensureAuthenticated, listUserSendComplimentController.handler)

router.post('/tags', ensureAuthenticated, ensureAdmin, createTagController.handle)
router.get('/tags', ensureAuthenticated, listTagsController.handler)


router.post('/compliments', ensureAuthenticated, createComplimentService.handle)

router.post('/login', authenticateUserController.handle)



export { router }
