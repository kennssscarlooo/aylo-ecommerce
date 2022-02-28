const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//SIGN UP
router.post("/signup", async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString(),
  });

  try {
    // CHECK EMAIL
    const username = await User.findOne({ username: req.body.username });
    if (username)
      return res.status(401).json("The username you provided is taken");
    // CREATE USER
    const savedUser = await newUser.save();
    // SIGN TOKEN
    const accessToken = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );
    // SEND RESPONSE
    const { password, ...userData } = savedUser._doc;
    return res.status(201).json({ accessToken, ...userData });
  } catch (err) {
    res.status(500).json(err);
  }
});

//SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) return res.status(401).json("Incorrect username");

    const encryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET
    );

    const originalPassword = encryptedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword !== inputPassword)
      return res.status(401).json("Incorrect password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...userData } = user._doc;
    res.status(200).json({ ...userData, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
