import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateVerificationCode } from "../utils/generateVerificationCode.js";
import { verificationCodeExpiry } from "../utils/verificationCodeExpiry.js";
import { generateTokenAndSetCookie } from "../utils/generateJwtTokenAndSetCookie.js";
export const signupController = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    if (![email, password, username].every(Boolean)) {
      return res.status(400).json({ error: "All fields are required." });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const usernameRegex = /^(?=.{3,15}$)[a-zA-Z0-9._]+(?:[a-zA-Z0-9]+)?$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email is incorrect" });
    }

    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: "username is incorrect" });
    }

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "password criteria is not matched",
      });
    }

    const user = await User.findOne({
      $or: [{ email: email }, { username: username }],
    });

    if (user) {
      return res
        .status(400)
        .json({ error: " username or email is already taken" });
    }
    const hashedPasword = await bcrypt.hash(password, 10);
    const verificationCode = generateVerificationCode();
    const verificationCodeExpiryDate = verificationCodeExpiry();

    const newUser = new User({
      email: email,
      password: hashedPasword,
      username: username,
      verificationCode: verificationCode,
      verificationCodeExpiry: verificationCodeExpiryDate,
    });
    await newUser.save();

    generateTokenAndSetCookie(res, newUser._id);
    const { password: userPassword, ...users } = newUser.toObject();
    return res.status(201).json({ users });
  } catch (error) {
    return res.status(400).send(`something gone wrong ${error.message}`);
  }
};

export const loginController = (req, res) => {
  res.send("this is login");
};
export const logoutController = (req, res) => {
  res.send("this is logout");
};
