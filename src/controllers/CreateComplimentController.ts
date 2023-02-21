import { Request, Response } from "express";
import { CreateComplimentService } from "../service/CreateComplimentService"

class CreateComplimentController {
  async handle(request: Request, response: Response) {
    const { tag_id, user_sender, user_receiver, message } = request.body

    console.log({ tag_id, user_sender, user_receiver, message })

    const createComplimentService = new CreateComplimentService();

    const compliment = await createComplimentService.execute({
      tag_id,
      user_sender,
      user_receiver,
      message
    })

    console.log(compliment)

    return response.json(compliment)
  }
}

export { CreateComplimentController }
