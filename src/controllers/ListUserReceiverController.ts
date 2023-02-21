import { Request, Response } from 'express'
import { ListUserReceiverComplimentService } from '../service/ListUserReceiverComplimentService'


class ListUserReceiverComplimentsController {
  async handler(request: Request, response: Response) {

    const { user_id } = request.body

    const userReceiveComplimentService = new ListUserReceiverComplimentService()

    const compliments = await userReceiveComplimentService.execute(user_id)

    console.log(request.body)

    // console.log(compliments)

    return response.json(compliments)


  }

}

export { ListUserReceiverComplimentsController }
