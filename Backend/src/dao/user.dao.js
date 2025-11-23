
import User from "../models/user.model.js";

export const findUserByEmailUsername = async (email, username) => {
  const existUser = await User.find({$or: [{ email }, { username }]});
  return existUser;
};

export const findUserbyId = async (id) => {
  return await User.findById(id);
};

export const createUser = async (name, username, email, hashedPassword, gender) => {
  const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
  const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;

  const user = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
    gender,
    avatar: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
  });

  return user;

  //console.log(user)
};
