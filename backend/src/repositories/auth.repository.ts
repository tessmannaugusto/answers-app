
import { AppDataSource } from "../../data-source.js";
import { User } from "../entity/user.entity.js";


export const UserRepository = AppDataSource.getRepository(User);