import { ComplimentRepository } from "../repositories/ComplimentRepository"


class ListUserReceiverComplimentService {
  async execute(user_id: string) {
    const complimentRepo = ComplimentRepository

    console.log("id", user_id)

    const compliments = await complimentRepo.find({
      where: {
        user_receiver: user_id
      },
      relations: ["userSender", "userReceiver", "tag"],
    })

    return compliments

  }
}

export { ListUserReceiverComplimentService }
