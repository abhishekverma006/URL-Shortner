import jsonwebtoken from "jsonwebtoken";
import bcryptjs from "bcryptjs"
import { createUser } from "../dao/user.dao.js";

export const registerUser = async (name, username, email, password, gender) => {

  const hashedPassword = await bcryptjs.hash(password, 10);

  const user = await createUser(name, username, email, hashedPassword, gender);

  console.log(user)

  return user;
};
