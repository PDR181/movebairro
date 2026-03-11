const bcrypt = require("bcrypt");
const { createUser, findUserByEmail } = require("../models/userModel");

async function register(req, res) {
  const { name, email, password } = req.body;

  const existingUser = findUserByEmail(email);

  if (existingUser) {
    return res.status(400).json({ message: "Usuário já existe" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = createUser({
    name,
    email,
    password: hashedPassword
  });

  res.json({ message: "Usuário criado", user });
}

module.exports = { register };