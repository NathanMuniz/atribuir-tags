import { TagRepository } from "../repositories/TagRepository";
import { classToPlain } from "class-transformer"


class ListTagService {
  async execute() {
    const tagRepo = TagRepository

    const tags = await tagRepo.find()

    console.log(classToPlain(tags))

    return classToPlain(tags)


  }
}

export { ListTagService }
