import { UserRepository } from "../repositories/UserRepository"
import { classToPlain } from "class-transformer"

class ListUserService {
  async execute() {
    const userRepo = UserRepository

    const users = await userRepo.find()

    console.log(users)

    return classToPlain(users)

  }
}

export { ListUserService }
