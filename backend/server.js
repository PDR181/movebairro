const express = require("express");
const cors = require("cors");
const app = express();

const userRoutes = require("./routes/userRoutes");
const activityRoutes = require("./routes/activityRoutes");

app.use(cors());
app.use(express.json());

app.use("/users", userRoutes);
app.use("/activities", activityRoutes);

app.get("/", (req, res) => {
  res.send("API MoveBairro funcionando");
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});