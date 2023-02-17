import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { CreateTagController } from "./controllers//CreateTagController";
import { ensureAdmin } from './middlewares/ensureAdmin'
import { CreateComplimentController } from "./controllers/CreateComplimentController"


const router = Router();

const createUserController = new CreateUserController();
const createTagService = new CreateTagController()
const createComplimentService = new CreateComplimentController()


router.post("/users", createUserController.handle);

router.post('/tags', ensureAdmin, createTagService.handle)

router.post('/compliments', createComplimentService.handle)


export { router }
