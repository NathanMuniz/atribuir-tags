import { Request, Response, NextFunction } from "express"
import { UserRepository } from "../repositories/UserRepository";


export async function ensureAdmin(
  request: Request,
  response: Response,
  next: NextFunction
) {
  // Verficar se usuário é admin 

  const { user_id } = request.body

  const userRepo = UserRepository

  const user = await userRepo.find({
    where: { id: user_id },
    select: ["id", "admin"],
  })


  const admin = user[0].admin

  if (admin) {
    return next();
  }

  return response.status(401).json({
    error: "Unathorized",
  });


}
