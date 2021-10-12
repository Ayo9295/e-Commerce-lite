const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/userModel");

exports.signup = async (req, res, next) => {
    try {
      let { firstName, lastName, email, password } = req.body;
  
      // const checkEmail = await User.findOne({ email });
      // if (checkEmail) {
      //   return res.json({
      //     status: "failed",
      //     message: "Email already exist",
      //   });
    // }
    password = await bcrypt.hash(password, 12,  function (err, hash) { 
      const user = await User.findById(req.user.id);
            user.lastName = lastName;
            user.firstName = firstName;
            user.email = email;
            user.password = password;
        
            await user.save();

    });
    if (!firstName, !lastName, !email, !password, !category) {
  
      return res.status(400).send({ message: "Content cannot be empty!" });
    }
    const newUser = { firstName, lastName, email, password };

    const createUser = await User.create(newUser);

    const id = createUser._id;

    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRES_IN}`,
    });
    

// push new user to dummy database--- add by descretion
    res.status(201).json({
      status: "success",
      token,
      data: {
        id: createUser._id,
        firstName: createUser.firstName,
        lastName: createUser.lastName,
        email: createUser.email,
      },
    });
} catch (err) {
    res.status(400).json({
      status: "fail",
      error: err,
    });
    console.log(err);
  }
next();
};


// Update a User by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
  
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update User with id=${id}. Maybe User was not found!`
          });
        } else res.send({ message: "User was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating User with id=" + id
        });
      });
  };
// exports.updateInfo = async (req, res) => {
//   let { firstName, lastName, email, password } = req.body;
//   try {
//     if ((!firstName || !lastName || !email, !password)) {
//       res.status(404).json({
//         status: "failed",
//         message: "Please enter all field",
//       });
//     }
//     const validateUser = await User.findOne({email });

//     password = await bcrypt.hash(password, 12);

//     if (validateUser) {
//         res
//           .status(404)
//           .json({ status: "failed", message: "User already exist" });
//       }
//       const user = await User.findById(req.user.id);
//       user.lastName = lastName;
//       user.firstName = firstName;
//       user.email = email;
//       user.password = password;
  
//       await user.save();
  
//       res.json({
//         status: "success",
//         message: "Profile updated successfully",
//       });
//     } catch (error) {}
//   };

  exports.getAllUser = async (req, res, next) => {
    try {
      console.log(req.user);
      const users = await User.find({});
  
      res.status(200).json({
        status: "success",
        data: users,
      });
    } catch (err) {
      console.log(err);
    }
    next();
  };

  //find a single User with an id
  exports.findOne = (req, res) => {
    const id = req.params.id;
  
    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found User with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving User with id=" + id });
      });
  };
  // exports.findOne = async (req, res, next) => {
  //   try {
  //     console.log(req.user);
  //     const user = await User.findById(id);
  
  //     res.status(200).json({
  //       status: "success",
  //       data: user,
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  //   next();
  // };


exports.login = async (req, res) => {
  console.log(req.body)
  const {email,password}= req.body
  const user = await User.findOne({email})
  if (!user) {
    return res.status(400).send('Cannot find user')
  }
  try {
    console.log(user)
    if ( await bcrypt.compare(password, user.password)) {
      res.send('success')
    }else {
      res.send('Not allowed')
    }
  } catch(error){ 
    res.status(500).send()
    console.log(error)

}
}

