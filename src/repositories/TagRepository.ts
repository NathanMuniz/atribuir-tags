import { AppDataSource } from "../data-source";
import { Tag } from "../entities/Tag"

export const TagRepository = AppDataSource.getRepository(Tag)
