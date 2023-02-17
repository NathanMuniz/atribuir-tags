import { AppDataSource } from "../data-source"
import { Compliment } from "../entities/Compliment"

export const ComplimentRepository = AppDataSource.getRepository(Compliment)

