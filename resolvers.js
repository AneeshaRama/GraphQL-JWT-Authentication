const Users = require("./userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const resolvers = {
  Mutation: {
    register: async (_, { name, email, password }) => {
      //check if user already registered
      const userExists = await Users.findOne({ email });
      if (userExists) {
        throw new Error("This email is already in use");
      }

      //hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 12);

      //save new user in the database
      const newUser = await new Users({
        name,
        email,
        password: hashedPassword,
      }).save();
      return newUser;
    },

    login: async (_, { email, password }) => {
      // check if there is user in our db
      const user = await Users.findOne({ email });
      if (!user) {
        throw new Error("Invalid email or password");
      }

      //Checking if password match
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new Error("Invalid email or password");
      }

      //generating jwt token using user id
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "3d",
      });
      return { token };
    },
  },
};

module.exports = { resolvers };
