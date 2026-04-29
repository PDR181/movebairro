const express = require("express");
const router = express.Router();

const {
  startActivity,
  getAllActivities,
  addLocation,
  finishActivity,
  getRanking,
  getCoordinates // 👈 ADICIONAR
} = require("../controllers/activityController");

router.post("/start", startActivity);
router.get("/", getAllActivities);
router.post("/location", addLocation);
router.post("/finish", finishActivity);
router.get("/ranking", getRanking);

// 👇 NOVA ROTA
router.get("/:id/coordinates", getCoordinates);

module.exports = router;