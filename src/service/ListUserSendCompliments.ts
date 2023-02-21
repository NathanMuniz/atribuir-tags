import { ComplimentRepository } from "../repositories/ComplimentRepository";
import { classToPlain } from "class-transformer"

class ListUserSendComplimentsService {
  async execute(user_id: string) {
    const complimentRepo = ComplimentRepository

    const complimentsSend = await complimentRepo.find({
      where: { user_sender: user_id },
      relations: ["userSender", "userReceiver", "tag"]
    })

    return classToPlain(complimentsSend)


  }

}

export { ListUserSendComplimentsService } 
