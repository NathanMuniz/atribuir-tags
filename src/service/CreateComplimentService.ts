import { ComplimentRepository } from "../repositories/ComplimentRepository"
import { Request, Response } from "express"
import { UserRepository } from "../repositories/UserRepository";
import { IUserRequest } from "./CreateUserService"


interface IComplimentRequest {
  tag_id: string;
  user_sender: string;
  user_receiver: string;
  message: string;
}

class CreateComplimentService {

  async execute({
    tag_id,
    user_sender,
    user_receiver,
    message,
  }: IComplimentRequest) {
    const complimentRepo = ComplimentRepository

    const userRepo = UserRepository

    if (user_sender === user_receiver) {
      throw new Error("Incorrecer User Reciever")
    }

    const userReceiverExists = await userRepo.findOne({
      where: {
        id: user_receiver
      }
    });

    if (!userReceiverExists) {
      throw new Error("User Receiver does not exists")
    }

    const compliment = complimentRepo.create({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    await complimentRepo.save(compliment)

    return compliment

  }

}

export { CreateComplimentService }
