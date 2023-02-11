import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/UserRepository"

interface IUserRequest {
  name: string;
  email: string;
  password: string;
  admin?: boolean

}

export class CreateUserService {
  async execute({ name, email, password, admin }: IUserRequest) {
    const userRepository = UserRepository;

    console.log("Email", email);

    if (!email) {
      throw new Error("Email incorrect");
    }

    const userAlreadyExists = await userRepository.findOneBy({
      email,
    })

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    const user = userRepository.create({
      name,
      email,
      password,
      admin
    })


    await userRepository.save(user);

    return user;



  }






}
