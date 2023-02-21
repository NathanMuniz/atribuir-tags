import { Request, Response } from "express"
import { ListTagService } from "../service/ListTagsService"


class ListTagsController {
  async handler(request: Request, response: Response) {
    const listTagService = new ListTagService()

    const tags = await listTagService.execute()

    console.log("Controller: ", tags)

    return response.json(tags)
  }


}

export { ListTagsController }
