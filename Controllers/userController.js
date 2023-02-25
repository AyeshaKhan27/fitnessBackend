const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const JWT_SECRET = "IamaQueen";
const User = db.user;

// 1. add user

const addUser = async (req, res) => {
  console.log(req.body);
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  try{
   User.findOne({where : {email : req.body.email}})
   .then((users) =>{
    
   })

  }

  // try {
  //   let user = await User.findOne({where : {email : req.body.email}});
  //   if (user) {
  //     res.status(400).send("exist");
  //   } else {
  //     const salt = await bcrypt.genSalt(10);
  //     const secPass = await bcrypt.hash(req.body.password, salt);
  //     user = await User.create({
  //       username: req.body.username,
  //       email: req.body.email,
  //       password: secPass,
  //     });
  //     res.status(200).send(user);
  //     console.log(user);
  //     const data = {
  //       user: {
  //         id: user.id,
  //       },
  //     };
  //     const authtoken = jwt.sign(data, JWT_SECRET);
  //     res.json(authtoken);
  //   }
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send("some error occured");
  // }

  // const user = await User.create(info)
  // res.status(200).send(user)
  // console.log(user)
};

const getAllusers = async (req, res) => {
  let users = await User.findAll({});
  res.status(200).send(users);
};

// 3. login

const login = async (req, res) => {
  console.log(req.body);

  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: " try to login with correct details" });
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      return res.status(400).json({ error: " invalid password" });
    }
    const data = {
      user: {
        id: user.id,
      },
    };
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json(authtoken);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
};

// 4. update user

const updateUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateuserdata = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
    });

    res.status(201).send(updateuserdata);
  } catch (e) {
    res.status(400).send(e);
  }
};

// 5. delete user

const deleteUser = async (req, res) => {
  try {
    const deletedata = await User.findByIdAndDelete(req.params.id);
    if (!req.params.id) {
      return res.status(400).send();
    } else {
      res.status(201).send(deletedata);
    }
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  addUser,
  getAllusers,
  login,
  updateUser,
  deleteUser,
};
