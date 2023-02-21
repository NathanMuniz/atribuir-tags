import { throws } from "assert";
import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagRepository";

export class CreateTagService {
  async execute(name: string) {
    const tagRepository = TagRepository

    if (!name) {
      throw new Error("Incorect name!");
    }

    const tagAlreadyExists = await tagRepository.findOne({
      where: { name: name }
    })

    if (tagAlreadyExists) {
      throw new Error("Tag already exists!")
    }

    const tag = tagRepository.create({
      name,
    })

    await tagRepository.save(tag)

    return tag

  }




}
