import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";


import { UserRepository } from "../repositories/UserRepository"

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAuthenticateRequest) {
    const userRepo = UserRepository

    // Verifcar se email existe

    const user = await userRepo.findOne({
      where: {
        email: email
      }
    })

    if (!user) {
      throw new Error("Email incorrect");
    }

    // Verificar se senha está correta 
    console.log(user)

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error("Email/Password incorrec");
    }

    const token = sign(
      {
        email: user.email,
      },
      "4f93ac9d10cb751b8c9c646bc9dbccb9",
      {
        subject: user.id,
        expiresIn: "1d"
      }
    )

    return token;

  }

}

export { AuthenticateUserService }


