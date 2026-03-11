const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
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

  res.json({ message: "Usuário criado com sucesso", user });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = findUserByEmail(email);

  if (!user) {
    return res.status(400).json({ message: "Usuário não encontrado" });
  }

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ message: "Senha inválida" });
  }

  const token = jwt.sign(
    { email: user.email },
    "segredo_super_secreto",
    { expiresIn: "1h" }
  );

  res.json({ message: "Login realizado", token });
}

module.exports = { register, login };