import { User } from "../entities/User"
import { AppDataSource } from "../data-source"

export const UserRepository = AppDataSource.getRepository(User)
