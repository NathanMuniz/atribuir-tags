import { verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";


interface IPayload {
  sub: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Receber o tokne 
  const authToken = request.headers.authorization;

  console.log(authToken)

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(" ");

  try {
    // validar se token é valido 
    const { sub } = verify(token,
      "4f93ac9d10cb751b8c9c646bc9dbccb9"
    ) as IPayload;

    request.body.user_id = sub;

    return next();
  } catch (err) {
    return response.status(401).end();
  }



}
