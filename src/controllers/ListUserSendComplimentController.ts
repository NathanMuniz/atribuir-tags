import { Request, Response } from 'express'
import { ListUserSendComplimentsService } from "../service/ListUserSendCompliments"



class ListUserSendComplimentController {
  async handler(request: Request, response: Response) {
    const { user_id } = request.body

    const listUserComplimentsService = new ListUserSendComplimentsService()

    const complimentsSend = await listUserComplimentsService.execute(user_id)

    console.log(complimentsSend)

    return response.json(complimentsSend)

  }

}

export { ListUserSendComplimentController }
